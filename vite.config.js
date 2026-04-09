import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalog: resolve(__dirname, 'catalog.html'),
        syrup: resolve(__dirname, 'syrup.html'),
        zfit: resolve(__dirname, 'zfit.html'),
        legal: resolve(__dirname, 'legal.html'),
      },
    },
  },
});
