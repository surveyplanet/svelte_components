import SurveyPlanetTheme from './surveyplanet_theme';
import './main.scss';

export const parameters = {
	actions: { argTypesRegex: '.*Handler$' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		theme: SurveyPlanetTheme,
	},
	backgrounds: {
		default: 'purple lightest',
		values: [
			{ name: 'white', value: '#ffffff' },
			{ name: 'light', value: '#f7f8f7' },
			{ name: 'dark', value: '#67748e' },
			{ name: 'darker', value: '#475062' },
			{ name: 'darkest', value: '#262b35' },
			{ name: 'purple lightest', value: '#f6f1ff' },
			{ name: 'purple lighter', value: '#ede2ff' },
			{ name: 'purple light', value: '#baa5db' },
			{ name: 'purple', value: '#b598ff' },
			{ name: 'purple dark', value: '#9a79ed' },
			{ name: 'blue', value: '#9ee4fa' },
			{ name: 'blue dark', value: '#78c4ee' },
			{ name: 'green', value: '#a1fda5' },
			{ name: 'green dark', value: '#7be492' },
			{ name: 'pink', value: '#ffb1e3' },
			{ name: 'pink dark', value: '#ea83c5' },
			{ name: 'yellow', value: '#ffe978' },
			{ name: 'yellow dark', value: '#fac766' },
		],
	},

	// https://storybook.js.org/docs/7.0/svelte/writing-stories/naming-components-and-hierarchy#sorting-stories
	// options: {
	// 	storySort: {
	// 		method: 'alphabetical',
	// 	},
	// },
};
