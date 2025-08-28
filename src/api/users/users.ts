import { FetchUtil } from "@/utils/fetchUtils";
import { AxiosInstance } from "axios";
import {
  CreateUserReqBodySchema,
  CreateUserReqBodyType,
  GetAllUsersParamsType,
  UserResponseSchema,
  UserResponseType,
  UserSchema,
  UserType,
} from "./models/users";

export class UserApi {
  static getAllUsers = async (network: AxiosInstance, params?: GetAllUsersParamsType) => {
    return await FetchUtil.validateResponse<UserResponseType>(
      () => network.get("/users", { params }),
      UserResponseSchema
    );
  };

  static getUserById = async (network: AxiosInstance, userId: string) => {
    return await FetchUtil.validateResponse<UserType>(() => network.get(`/users/${userId}`), UserSchema);
  };

  static createUser = async (network: AxiosInstance, reqBody: CreateUserReqBodyType) => {
    const { data, success, error } = CreateUserReqBodySchema.safeParse(reqBody);
    if (!success) throw error;

    return await FetchUtil.validateResponse<UserType>(() => network.post("/users", data), UserSchema);
  };
}
