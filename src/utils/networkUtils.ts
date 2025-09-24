import { IamApi } from '@/api/iam/iam';
import { COOKIE_KEYS, globalVar } from '@/constants/constants';
import { AxiosInterceptorErrorSchema } from '@/models/models';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

let isRefreshing = false;
const failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null) => {
  while (failedQueue.length > 0) {
    const prom = failedQueue.pop();
    if (error) prom?.reject(error);
    else prom?.resolve(token);
  }
};

export class NetworkUtils {
  static create = (config?: AxiosRequestConfig) => {
    const instance = axios.create({
      ...config,
      baseURL: globalVar.BASE_URL,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const axiosError = error as AxiosError;

        const originalRequest = axiosError.config;
        const responseStatus = axiosError.response?.status;
        const responseData = AxiosInterceptorErrorSchema.parse(
          axiosError.response?.data,
        );

        if (
          responseStatus === 401 &&
          responseData.message === 'token is expired'
        ) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.unshift({ resolve, reject });
            }).then((token) => {
              if (originalRequest) {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return instance(originalRequest);
              }
            });
          }

          isRefreshing = true;
          const serverCookies = await cookies();
          try {
            const result = await IamApi.refreshToken(instance);
            serverCookies.set(COOKIE_KEYS.ACCESS_TOKEN, result.access_token);
            serverCookies.set(COOKIE_KEYS.REFRESH_TOKEN, result.refresh_token);

            if (originalRequest) {
              originalRequest.headers.Cookie = `${COOKIE_KEYS.ACCESS_TOKEN}=${result.access_token};${COOKIE_KEYS.REFRESH_TOKEN}=${result.refresh_token}`;
              processQueue(null, result.access_token);
              return instance(originalRequest);
            }
          } catch (err) {
            serverCookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
            serverCookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
            processQueue(err as Error, null);
            redirect('/login');
          } finally {
            isRefreshing = false;
          }
        }
        return Promise.reject(error);
      },
    );

    instance.interceptors.request.use(async (config) => {
      const serverCookies = await cookies();
      const accessToken = serverCookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
      const refreshToken = serverCookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

      const cookieStrArr: string[] = [];
      if (accessToken) {
        cookieStrArr.push(`${COOKIE_KEYS.ACCESS_TOKEN}=${accessToken}`);
      }
      if (refreshToken) {
        cookieStrArr.push(`${COOKIE_KEYS.REFRESH_TOKEN}=${refreshToken}`);
      }

      config.headers.Cookie = cookieStrArr.join(';');
      return config;
    });

    return instance;
  };

  static withCredentials = (config?: AxiosRequestConfig) => {
    return this.create({
      ...config,
      withCredentials: true,
    });
  };
}
