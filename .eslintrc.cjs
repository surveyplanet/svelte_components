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
		'prettier',
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
		{
			files: ['**/*.test.ts'],
			rules: {
				'@typescript-eslint/unbound-method': 'off',
			},
		},
	],
	rules: {
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off', // allow Non-null assertion operator (!)
		'no-undef': 'off', // typescript already checks this
	},
	ignorePatterns: [
		'*.cjs',
		'.DS_Store',
		'node_modules',
		'/build',
		'/.svelte-kit',
		'/package',
		'/dist',
		'/bin',
		'.env',
		'.env.*',
		'!.env.example',
		'package-lock.json',
		'vite.config.js',
		'svelte.config.js',
		'histoire.config.ts',
		'playwright.config.ts',
<<<<<<< HEAD
=======
		'/src/stories',
>>>>>>> origin/alpha
	],
};
