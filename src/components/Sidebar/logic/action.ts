"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const serverCookies = await cookies();
  serverCookies.delete("user");
};
