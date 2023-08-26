module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gray: '#888888',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
