import { defineConfig } from 'histoire';
import { HstSvelte } from '@histoire/plugin-svelte';

export default defineConfig({
	plugins: [HstSvelte()],
	storyMatch: ['**/*.story.svelte'],
	storyIgnored: ['**/node_modules/**', '**/dist/**', './src/stories'],
});
