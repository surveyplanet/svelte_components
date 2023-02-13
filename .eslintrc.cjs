module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// sourceType: 'module',
		// ecmaVersion: 2020,
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
		// This is borken right now: https://github.com/typescript-eslint/typescript-eslint/issues/6314
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
		{
			files: ['./src/stories/**/*.ts', './src/stories/**/*.svelte'],
			rules: {
				'@typescript-eslint/unbound-method': 'warn',
				'@typescript-eslint/no-non-null-assertion': 'off', // allow ! in tests
			},
		},
	],
	rules: {
		'@typescript-eslint/no-unnecessary-condition': 'off',
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
