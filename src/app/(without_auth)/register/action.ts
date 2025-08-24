"use server";

import { CreateUserReqBodyType } from "@/api/users/models/users";
import { UserApi } from "@/api/users/users";
import { NetworkUtils } from "@/utils/networkUtils";
import bcrypt from "bcrypt";

export const register = async (reqBody: CreateUserReqBodyType) => {
  reqBody.password = await bcrypt.hash(reqBody.password, 10);
  const network = NetworkUtils.create();
  await UserApi.createUser(network, reqBody);
};
