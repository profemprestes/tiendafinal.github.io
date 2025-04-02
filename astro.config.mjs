import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import autoImport from 'astro-auto-import';
// Remove unused import

export default defineConfig({
  site: 'https://preciohogar.com',
  base: '/',
  integrations: [
    tailwind(),
    react(),
    autoImport({
      imports: ['astro:content', 'astro:assets'], // Importaciones automáticas
      components: true, // Auto-importar componentes
    }),
  ],
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
