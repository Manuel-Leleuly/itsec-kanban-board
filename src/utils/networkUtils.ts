import { globalVar } from '@/constants/constants';
import axios, { AxiosRequestConfig } from 'axios';

export class NetworkUtils {
  static create = (config?: AxiosRequestConfig) => {
    return axios.create({
      ...config,
      baseURL: globalVar.MOCKAPI_BASE_URL,
    });
  };
}
