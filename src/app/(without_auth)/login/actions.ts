"use server";

import { UserType } from "@/api/users/models/users";
import { cookies } from "next/headers";

export const login = async (user: UserType) => {
  const serverCookies = await cookies();
  serverCookies.set("user", JSON.stringify(user), { httpOnly: true });
};
