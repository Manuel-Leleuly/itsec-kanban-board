import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import nextRouterMock from 'next-router-mock';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './node';

configure({
  asyncUtilTimeout: 3000,
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();

  return {
    ...actual,
    useRouter: vi.fn(() => nextRouterMock),
    usePathname: vi.fn(() => nextRouterMock.pathname),
    useSearchParams: vi.fn(() => {
      // next-router-mock's query is an object, so we convert it to URLSearchParams
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(nextRouterMock.query)) {
        if (value) queryParams.set(key, String(value));
      }
      return queryParams;
    }),
  };
});

vi.mock('next/headers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/headers')>();

  return {
    ...actual,
    cookies: vi.fn(async () => ({
      get: (key: string) => ({ value: `mock-cookie-value-for-${key}` }),
      set: (key: string, value: string) =>
        console.log(`${key} with ${value} is added to cookie`),
      delete: (key: string) => console.log(`${key} is deleted from cookie`),
    })),
  };
});
