import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    react()
  ],

  site: 'https://profemprestes.github.io/tiendafinal.github.io',
  base: '/',

  build: {
    assets: '_astro',  // Cambiado a _astro para mejor compatibilidad con gh-pages
    format: 'directory', // Cambiado a directory para mejor rendimiento y SEO
    assetsPrefix: '/', // Asegura que las URLs de assets sean absolutas
    inlineStylesheets: 'auto' // Optimiza la carga de estilos
  },

  // Mejora el rendimiento comprimiendo HTML
  compressHTML: true,

  vite: {
    plugins: [tailwindcss()]
  }
});