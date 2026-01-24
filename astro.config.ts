import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.keisatoh.net',
  output: 'static',
  adapter: cloudflare(),
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
