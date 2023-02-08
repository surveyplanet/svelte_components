import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import SurveyPlanetTheme from './surveyplanet_theme';

addons.setConfig({
	theme: SurveyPlanetTheme,
	sidebar: {
		showRoots: true,
	},
});
