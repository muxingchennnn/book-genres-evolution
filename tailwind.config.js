/** @type {import('tailwindcss').Config} */

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: '"Geist Variable", "Inter", serif',
				serif: '"Source Serif 4 Variable", serif'
			}
		}
	}
};

export default config;
