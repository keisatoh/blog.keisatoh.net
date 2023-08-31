module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gray: '#888888',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              fontWeight: theme('fontWeight.medium'),
              color: theme('colors.gray'),
              marginTop: '36px',
              marginBottom: '36px',
              paddingLeft: '20px',
              fontWeight: '400',
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
  plugins: [require('@tailwindcss/typography')],
};
