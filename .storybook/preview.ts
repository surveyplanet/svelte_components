import SurveyPlanetTheme from './surveyplanet_theme';
import './main.scss';
import { COLORS } from '../src/lib/_definitions';

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
		default: 'light purple light',
		values: Object.keys(COLORS).map((key): object => {
			return {
				name: key.toLocaleLowerCase().replace(/_/g, ' '),
				value: (COLORS as { [key: string]: string })[key],
			};
		}),
	},

	// https://storybook.js.org/docs/7.0/svelte/writing-stories/naming-components-and-hierarchy#sorting-stories
	// options: {
	// 	storySort: {
	// 		method: 'alphabetical',
	// 	},
	// },
};
