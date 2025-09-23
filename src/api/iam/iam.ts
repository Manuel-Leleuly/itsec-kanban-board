import {
  LoginReqBody,
  LogoutResponse,
  LogoutResponseSchema,
  TokenResponse,
  TokenResponseSchema,
  UserCreateReqBody,
  UserResponse,
  UserResponseSchema,
} from '@/api/iam/models/iam';
import { FetchUtil } from '@/utils/fetchUtils';
import { AxiosInstance } from 'axios';

export class IamApi {
  static login = async (network: AxiosInstance, reqBody: LoginReqBody) => {
    return await FetchUtil.validateResponse<TokenResponse>(
      () => network.post('/iam/v1/login', reqBody),
      TokenResponseSchema,
    );
  };

  static createUser = async (
    network: AxiosInstance,
    reqBody: UserCreateReqBody,
  ) => {
    return await FetchUtil.validateResponse<UserResponse>(
      () => network.post('/iam/v1/users', reqBody),
      UserResponseSchema,
    );
  };

  static getMe = async (network: AxiosInstance) => {
    return await FetchUtil.validateResponse<UserResponse>(
      () => network.get('/iam/v1/users/me'),
      UserResponseSchema,
    );
  };

  static logout = async (network: AxiosInstance) => {
    return await FetchUtil.validateResponse<LogoutResponse>(
      () => network.post('/iam/v1/logout'),
      LogoutResponseSchema,
    );
  };
}
