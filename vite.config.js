import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalog: resolve(__dirname, 'catalog.html'),
        syrup: resolve(__dirname, 'syrup.html'),
        drops: resolve(__dirname, 'drops.html'),
        mapleTopping: resolve(__dirname, 'maple-topping.html'),
        zfit: resolve(__dirname, 'zfit.html'),
        about: resolve(__dirname, 'about.html'),
        social: resolve(__dirname, 'social.html'),
        legal: resolve(__dirname, 'legal.html'),
        articles: resolve(__dirname, 'articles.html'),
      },
    },
  },
});
