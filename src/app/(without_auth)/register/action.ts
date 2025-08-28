"use server";

import { CreateUserReqBodyType } from "@/api/users/models/users";
import { UserApi } from "@/api/users/users";
import { NetworkUtils } from "@/utils/networkUtils";
import { isAxiosError } from "axios";
import bcrypt from "bcrypt";

const error500 = "internal server error";

export const register = async (reqBody: CreateUserReqBodyType) => {
  try {
    const network = NetworkUtils.create();

    /**
     * Check if the email is already used
     *
     * mockAPI will throw error 404 if none of the user's email match the request email (which is the correct expectation).
     * Therefore, I put another try catch in here to prevent false error
     */
    try {
      const result = await UserApi.getAllUsers(network, { email: reqBody.email });
      const isEmailAlreadyUsed = result.some((user) => user.email === reqBody.email);
      if (isEmailAlreadyUsed) {
        throw new Error("email is already used");
      }
    } catch (error) {
      // only throw error if it's because the email is already used
      if (error instanceof Error && !isAxiosError(error)) {
        throw error;
      }
    }

    // encrypt password
    reqBody.password = await bcrypt.hash(reqBody.password, 10);

    // save the new user
    await UserApi.createUser(network, reqBody);
  } catch (error) {
    if (isAxiosError(error)) {
      const { response } = error;
      if (response) {
        if (response.status.toString().startsWith("5")) {
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
