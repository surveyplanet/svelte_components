import { defineConfig, defaultColors } from 'histoire';
import { HstSvelte } from '@histoire/plugin-svelte';

export default defineConfig({
	plugins: [HstSvelte()],
	storyMatch: ['**/*.story.svelte'],
	storyIgnored: ['**/node_modules/**', '**/dist/**', './src/stories'],
	// tree: {
	// 	file: 'title',
	// 	order: 'asc',
	// },
	theme: {
		title: 'SurveyPlanet design system',
		favicon: './static/assets/favicon.ico',
		logo: {
			square: './static/assets/surveyplanet-logo-square.svg',
			light: './static/assets/surveyplanet-logo-dark.svg',
			dark: './static/assets/surveyplanet-logo-light.svg',
		},
		colors: {
			gray: defaultColors.slate,
			primary: defaultColors.violet,
		},
		logoHref: 'https://surveyplanet.com',
		defaultColorScheme: 'dark',
		hideColorSchemeSwitch: false,
		storeColorScheme: false,
	},
	// setupFile: '/src/histoire/setup.ts', // <-- doesn't work
	// viteIgnorePlugins: [
	// 	'vite-plugin-sveltekit-setup',
	// 	'vite-plugin-sveltekit-compile',
	// ],
});
