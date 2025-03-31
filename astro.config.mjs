import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    icon({
      include: {
        tabler: ["*"] // Include all icons from the tabler icon set
      }
    }), 
    react()
  ],
  site: 'https://preciohogar.com',
  base: '/',
});