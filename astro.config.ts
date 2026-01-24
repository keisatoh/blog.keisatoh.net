import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.keisatoh.net',
  integrations: [tailwind(), svelte(), sitemap()],
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
