'use server';

import { IamApi } from '@/api/iam/iam';
import {
  LoginReqBody,
  LoginReqBodySchema,
  UserCreateReqBody,
} from '@/api/iam/models/iam';
import { COOKIE_KEYS } from '@/constants/constants';
import { FetchUtil } from '@/utils/fetchUtils';
import { NetworkUtils } from '@/utils/networkUtils';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';

const errorInvalidEmailPassword = 'invalid email and/or password';
const error500 = 'internal server error';

export const register = async (reqBody: UserCreateReqBody) => {
  try {
    const network = NetworkUtils.withCredentials();
    await IamApi.createUser(network, reqBody);
    return null;
  } catch (err) {
    let errorMessage = (err as Error).message;
    if (isAxiosError(err)) {
      if (err.response?.status.toString().startsWith('5')) {
        errorMessage = error500;
      }
    } else if (err instanceof ZodError) {
      errorMessage = err.message;
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'register',
    });
  }
};

export const login = async (reqBody: LoginReqBody) => {
  try {
    const network = NetworkUtils.withCredentials();
    const loginReqBody = LoginReqBodySchema.parse(reqBody);
    const result = await IamApi.login(network, loginReqBody);

    const serverCookies = await cookies();
    serverCookies.set(COOKIE_KEYS.ACCESS_TOKEN, result.access_token, {
      httpOnly: true,
    });
    serverCookies.set(COOKIE_KEYS.REFRESH_TOKEN, result.refresh_token, {
      httpOnly: true,
    });
    return null;
  } catch (err) {
    let errorMessage = (err as Error).message;

    if (isAxiosError(err)) {
      const { response } = err;
      if (response) {
        if (response.status === 404) {
          errorMessage = errorInvalidEmailPassword;
        } else if (Math.floor(response.status / 100) === 5) {
          errorMessage = error500;
        }
      }
    } else if (err instanceof ZodError) {
      errorMessage = err.message;
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'login',
    });
  }
};

export const logout = async () => {
  (await cookies()).delete(COOKIE_KEYS.USER);
};
