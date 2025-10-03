import Env from '@next/env';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

Env.loadEnvConfig(process.cwd());

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/vitest.setup.ts'],
    testTimeout: 5000,
  },
});
