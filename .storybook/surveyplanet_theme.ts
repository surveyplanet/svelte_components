// .storybook/YourTheme.js

import { create } from '@storybook/theming/create';
import { themes } from '@storybook/theming';

const dark = 'rgb(38,43,53)';

export default create({
	base: 'dark',
	brandTitle: 'SurveyPlanet UI',
	brandUrl: 'https://surveyplanet.com',
	brandImage:
		'https://public.surveyplanet.com/logos/surveyplanet-logo-light.svg',
	brandTarget: '_self',
	textColor: 'rgb(245, 240, 255)',

	// UI
	appBg: dark,
	appContentBg: dark,
	appBorderColor: 'rgb(70, 76, 87)',
	appBorderRadius: 0,

	// Toolbar default and active colors
	barTextColor: 'white',
	barSelectedColor: dark,
	barBg: dark,

	// // Form colors
	inputBg: 'white',
	inputBorder: 'silver',
	inputTextColor: 'black',
	inputBorderRadius: 0,
});
