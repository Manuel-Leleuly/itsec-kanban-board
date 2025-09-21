export const globalVar = {
  BASE_URL: process.env.BASE_URL ?? '',
};

export enum COOKIE_KEYS {
  USER = 'user',
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}
