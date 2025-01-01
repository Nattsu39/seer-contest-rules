import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['examples/**/*.test.ts'],
    environment: 'node',
  },
});
