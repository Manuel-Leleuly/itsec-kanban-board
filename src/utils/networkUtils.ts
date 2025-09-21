import { COOKIE_KEYS, globalVar } from '@/constants/constants';
import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

export class NetworkUtils {
  static create = (config?: AxiosRequestConfig) => {
    const instance = axios.create({
      ...config,
      baseURL: globalVar.BASE_URL,
    });

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
