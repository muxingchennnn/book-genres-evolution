/** @type {import('tailwindcss').Config} */

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1440px'
		},
		extend: {
			fontFamily: {
				sans: '"Geist Variable", "Inter", serif',
				serif: '"Source Serif 4 Variable", serif'
			}
		}
	}
};

export default config;
