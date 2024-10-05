/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)'
			},
			fontFamily: {
				sofia: ['sofia-pro', 'sans-serif'],
				span: ['span', 'serif']
			}
		}
	},
	plugins: []
};
