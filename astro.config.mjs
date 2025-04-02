import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://preciohogar.com',
  base: '/',
  build: {
    assets: '_astro',
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            cart: ['./src/components/carritocomponente.astro'],
          },
        },
      },
    },
  },
});
