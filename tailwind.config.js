/** @type {import('tailwindcss').Config} */

module.exports = {
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
