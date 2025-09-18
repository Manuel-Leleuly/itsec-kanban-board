import z from 'zod';

export const globalVar = {
  MOCKAPI_BASE_URL: process.env.MOCKAPI_BASE_URL ?? '',
};

export const COOKIE_KEYS = z.enum(['USER']).enum;

// for easy filtering in mockapi
export const DELETED_AT_DEFAULT = 'not_deleted';
