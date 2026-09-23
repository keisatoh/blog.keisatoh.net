export const SITE_TITLE = 'blog.keisatoh.net';
export const SITE_DESCRIPTION = 'keisatohのブログ';
export const SITE_URL = 'https://blog.keisatoh.net';
export const AUTHOR_NAME = 'keisatoh';

const NOTO_SANS_JP_VERSION = '5.3.0';

export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
  fonts: {
    regular: `https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@${NOTO_SANS_JP_VERSION}/japanese-400-normal.woff`,
    bold: `https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@${NOTO_SANS_JP_VERSION}/japanese-700-normal.woff`,
    family: 'Noto Sans JP',
  },
  styles: {
    background: '#ffffff',
    textColor: '#1f2778',
    padding: 80,
    titleFontSize: {
      default: 52,
      long: 44,
    },
    titleThreshold: 20,
  },
} as const;
