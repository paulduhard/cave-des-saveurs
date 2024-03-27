/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
    },
    extend: {
      fontFamily: {
        'sofia': ['sofia-pro', 'sans-serif'],
        'span': ['span', 'serif'],
      },
    },
  },
  plugins: [],
}

