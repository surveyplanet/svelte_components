import { create } from '@storybook/theming/create';
import { themes } from '@storybook/theming';
import { COLORS } from '../src/lib/_definitions';

const lightTransparent = 'rgba(255,255,255,0.1)';

export default create({
	base: 'dark',
	brandTitle: 'SurveyPlanet UI',
	brandUrl: 'https://surveyplanet.com',
	brandImage:
		'https://public.surveyplanet.com/logos/surveyplanet-logo-light.svg',
	brandTarget: '_self',
	textColor: COLORS.slate_lighter,
	colorPrimary: COLORS.purple,
	colorSecondary: COLORS.purple,

	// UI
	appBg: COLORS.slate_dark,
	appContentBg: COLORS.slate_dark,
	appBorderColor: lightTransparent,
	appBorderRadius: 0,

	// Typography
	fontBase: '"Suisse Screen Medium", sans-serif',
	fontCode: '"Suisse Mono", monospace',

	// Toolbar default and active colors
	barTextColor: 'white',
	barSelectedColor: COLORS.slate_lighter,
	barBg: COLORS.slate_dark,

	// Form colors
	inputBg: lightTransparent,
	inputBorder: lightTransparent,
	inputTextColor: COLORS.slate_lighter,
	inputBorderRadius: 2,
});
