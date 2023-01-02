import SurveyPlanetTheme from './surveyplanet_theme';
import './main.scss';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		theme: SurveyPlanetTheme,
	},

	// https://storybook.js.org/docs/7.0/svelte/writing-stories/naming-components-and-hierarchy#sorting-stories
	// options: {
	// 	storySort: {
	// 		method: 'alphabetical',
	// 	},
	// },
};
