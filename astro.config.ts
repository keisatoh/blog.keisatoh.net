import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';

export default defineConfig({
  site: 'https://blog.keisatoh.net',
  output: 'static',
  adapter: cloudflare(),
  integrations: [tailwind(), sitemap(), critters()],
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
