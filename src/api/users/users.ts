import { FetchUtil } from "@/utils/fetchUtils";
import { AxiosInstance } from "axios";
import { UserResponseSchema, UserResponseType, UserSchema, UserType } from "./models/users";

export class UserApi {
  static getAllUsers = async (network: AxiosInstance) => {
    return await FetchUtil.validateResponse<UserResponseType>(() => network.get("/users"), UserResponseSchema);
  };

  static getUserById = async (network: AxiosInstance, userId: number) => {
    return await FetchUtil.validateResponse<UserType>(() => network.get(`/users/${userId}`), UserSchema);
  };
}
