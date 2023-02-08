module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// sourceType: 'module',
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
		extraFileExtensions: ['.svelte'],
	},
	settings: {
		'svelte3/typescript': () => require('typescript'),
		// 'svelte3/typescript': true, ... or, load TypeScript as peer dependency
	},
	plugins: ['@typescript-eslint', 'svelte3'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/strict',
		'plugin:eslint-comments/recommended',
		'plugin:storybook/recommended',
		'prettier',
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	rules: {
		'@typescript-eslint/unbound-method': 'warn',
	},
	ignorePatterns: [
		'*.cjs',
		'.DS_Store',
		'node_modules',
		'/build',
		'/.svelte-kit',
		'/package',
		'.env',
		'.env.*',
		'!.env.example',
		'package-lock.json',
		'vite.config.js',
		'svelte.config.js',
	],
};
