/// <reference types="histoire" />

import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 6006,
		strictPort: true,
	},
	test: {
		environment: 'jsdom',
	},
};

export default config;
