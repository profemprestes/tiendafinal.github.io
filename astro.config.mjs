import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    react()
  ],
  site: 'https://profemprestes.github.io/tiendafinal.github.io',
  base: '/',
  build: {
    assets: '/assets',
    format: 'file'
  }
});