/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				dark: {
					1: 'var(--color-primary-dark)',
					2: 'var(--color-secondary-dark)',
					3: 'var(--color-third-dark)',
				},
				light: {
					1: 'var(--color-primary-light)',
					2: 'var(--color-secondary-light)',
					3: 'var(--color-third-light)',
				},
				grey: 'var(--grey)',
				blue: 'var(--blue)',
				purple: 'var(--purple)',
				green: '#24D33A',
			},
		},
	},
	plugins: [],
};
