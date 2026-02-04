import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import critters from 'astro-critters';

export default defineConfig({
  site: 'https://blog.keisatoh.net',
  integrations: [sitemap(), critters()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    experimentalLayout: 'responsive',
    defaultFormat: 'avif',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
});
