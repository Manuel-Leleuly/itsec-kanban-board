"use server";

import { LoginReqBodyType } from "@/api/users/models/users";
import { UserApi } from "@/api/users/users";
import { NetworkUtils } from "@/utils/networkUtils";
import { isAxiosError } from "axios";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const errorInvalidEmailPassword = "invalid email and/or password";
const error500 = "internal server error";

export const login = async (reqBody: LoginReqBodyType) => {
  try {
    // get the user from BE
    const network = NetworkUtils.create();
    const result = await UserApi.getAllUsers(network, { email: reqBody.email });
    if (!result.length) throw new Error(errorInvalidEmailPassword);

    const user = result[0];

    /**
     * Query param in mockapi can be partial
     *
     * email in BE: johndoe@example.com
     *
     * email query param:
     * - johndoe@example.com // correct
     * - johndoe@ // also correct
     *
     * need to make sure that the user inputs the full email
     */
    if (reqBody.email !== user.email) throw new Error(errorInvalidEmailPassword);

    // cek password
    const isPasswordMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!isPasswordMatch) throw new Error(errorInvalidEmailPassword);

    // save user inside cookies
    const serverCookies = await cookies();
    serverCookies.set("user", JSON.stringify(user), { httpOnly: true });
    return null;
  } catch (error) {
    if (isAxiosError(error)) {
      const { response } = error;
      if (response) {
        if (response.status === 404) {
          return {
            error_message: errorInvalidEmailPassword,
          };
        } else if (response.status.toString().startsWith("5")) {
          return {
            error_message: error500,
          };
        }
      }
    } else if (error instanceof Error) {
      return {
        error_message: error.message,
      };
    }
  }
};
