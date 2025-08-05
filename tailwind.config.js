/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				sm: '600px',
				md: '728px',
				lg: '984px',
				xl: '1240px',
				'2xl': '1496px'
			}
		},
		colors: {
			primary: 'var(--primary)',
			secondary: 'var(--secondary)'
		},
		extend: {
			fontFamily: {
				sofia: ['sofia-pro', 'sans-serif'],
				span: ['span', 'serif']
			},
			filter: {
				primary:
					'invert(8%) sepia(52%) saturate(3570%) hue-rotate(353deg) brightness(95%) contrast(119%)',
				secondary:
					'invert(99%) sepia(5%) saturate(191%) hue-rotate(308deg) brightness(97%) contrast(93%);'
			}
		}
	},
	plugins: [
		function ({ addUtilities, theme }) {
			const filterUtilities = Object.entries(theme('filter', {})).reduce(
				(acc, [key, value]) => ({
					...acc,
					[`.filter-${key}`]: { filter: value }
				}),
				{}
			);

			addUtilities(filterUtilities);
		}
	]
};
