/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      primary: '#3D0404',
      secondary: '#F0EFED',
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

