import remarkGfm from 'remark-gfm';

module.exports = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-docs',
			options: {
				mdxCompileOptions: {
					remarkPlugins: [remarkGfm],
				},
			},
		},
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {},
	},
	docs: {
		defaultName: 'Documentation',
		docsPage: true,
	},
	staticDirs: ['../src/assets'],
};
