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
		// 'svelte3/typescript': () => require('typescript'),
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		// This is borken right now: https://github.com/typescript-eslint/typescript-eslint/issues/6314
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/strict',
		'plugin:eslint-comments/recommended',
		'plugin:svelte/recommended', // https://github.com/sveltejs/eslint-plugin-svelte?tab=readme-ov-file#book-usage
		// 'prettier',
	],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			// Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		{
			files: ['**/*.test.ts'],
			rules: {
				'@typescript-eslint/unbound-method': 'off',
			},
		},
		{
			files: ['**/*.story.svelte'],
			rules: {
				'svelte/no-at-html-tags': 'off',
			},
		},
	],
	rules: {
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off', // allow Non-null assertion operator (!)
		'no-undef': 'off', // typescript already checks this
		'svelte/no-at-html-tags': 'warn',
	},
	ignorePatterns: [
		'!.env.example',
		'.DS_Store',
		'.env.*',
		'.env',
		'.histoire',
		'.svelte-kit',
		'*.cjs',
		'bin',
		'build',
		'dist',
		'node_modules',
		'package-lock.json',
		'package',
		'svelte.config.js',
		'vite.config.js',
	],
};
