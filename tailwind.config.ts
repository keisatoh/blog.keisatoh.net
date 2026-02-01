import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,md,ts}'],
  theme: {
    extend: {
      colors: {
        gray: '#737373',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            blockquote: {
              fontWeight: theme('fontWeight.medium'),
              color: theme('colors.gray'),
              marginTop: '36px',
              marginBottom: '36px',
              paddingLeft: '20px',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
