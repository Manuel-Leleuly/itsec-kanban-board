"use server";

import { LoginReqBodyType, UserType } from "@/api/users/models/users";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export const login = async (reqBody: LoginReqBodyType, user: UserType) => {
  try {
    const isPasswordMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!isPasswordMatch) throw new Error("invalid email and/or password");
    const serverCookies = await cookies();
    serverCookies.set("user", JSON.stringify(user), { httpOnly: true });
    return null;
  } catch (error) {
    if (Error.isError(error)) {
      return {
        error_message: error.message,
      };
    }
  }
};
