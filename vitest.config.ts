import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: [...configDefaults.include, 'src/**/*.test.ts'],
    exclude: [...configDefaults.exclude],
    coverage: {
      reporter: ['lcov', 'text', 'html'],
    },
  },
});
