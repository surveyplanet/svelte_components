import { create } from '@storybook/theming/create';
import { themes } from '@storybook/theming';

const light = 'rgb(245, 240, 255)';
const dark = 'rgb(38,43,53)';
const darkLight = 'rgb(70, 76, 87)';
const accent = '#5BC84D';

export default create({
	base: 'dark',
	brandTitle: 'SurveyPlanet UI',
	brandUrl: 'https://surveyplanet.com',
	brandImage:
		'https://public.surveyplanet.com/logos/surveyplanet-logo-light.svg',
	brandTarget: '_self',
	textColor: light,

	// UI
	appBg: dark,
	appContentBg: dark,
	appBorderColor: darkLight,
	appBorderRadius: 0,

	// Toolbar default and active colors
	barTextColor: darkLight,
	barSelectedColor: light,
	barBg: dark,

	// // Form colors
	inputBg: darkLight,
	inputBorder: 'black',
	inputTextColor: light,
	inputBorderRadius: 2,
});
