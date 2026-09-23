import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import type { AstroUserConfig } from 'astro';
import critters from 'astro-critters';

type AstroVitePlugin = NonNullable<NonNullable<AstroUserConfig['vite']>['plugins']>[number];

export default defineConfig({
  site: 'https://blog.keisatoh.net',
  integrations: [sitemap(), critters()],
  vite: {
    // Vite+ exposes a separate Vite type, but the plugin is runtime-compatible.
    plugins: [tailwindcss() as unknown as AstroVitePlugin],
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
});
