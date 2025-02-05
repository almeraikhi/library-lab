import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  //   dts: true, // Generates .d.ts files
  //   sourcemap: true, // If you need source maps
  clean: true,
});
