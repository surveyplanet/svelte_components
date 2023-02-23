export const enum SIZES {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
}

export const enum BUTTON_MODES {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	TERTIARY = 'tertiary',
	QUATERNARY = 'quaternary',
	DARK = 'dark',
	LIGHT = 'light',
}

export const COLORS = {
	slate_lighter: '#dcdee1',
	slate_light: '#a2a6af',
	slate: '#737a87',
	slate_dark: '#162137',

	light_purple_light: '#f4f0ff',
	light_purple: '#ece5ff',
	light_purple_dark: '#baa5db',

	purple_light: '#dbccff',
	purple: '#b598ff',
	purple_dark: '#9a79ed',

	blue_light: '#d8f4fd',
	blue: '#9ee4fa',
	blue_dark: '#78c4ee',

	green_light: '#d9fedb',
	green: '#a1fda5',
	green_dark: '#7be492',

	pink_light: '#ffd8f1',
	pink: '#ffb1e3',
	pink_dark: '#ea83c5',

	yellow_light: '#fff5bc',
	yellow: '#ffe978',
	yellow_dark: '#fac766',

	white: '#ffffff',
	black: '#162137',
};

export const MASCOTS = {
	marvin: `https://via.placeholder.com/512/${COLORS.blue.replace(
		'#',
		''
	)}/${COLORS.black.replace('#', '')}?text=MARVIN`,
	dylan: `https://via.placeholder.com/512/${COLORS.green.replace(
		'#',
		''
	)}/${COLORS.black.replace('#', '')}?text=DYLAN`,
	aaron: `https://via.placeholder.com/512/${COLORS.pink.replace(
		'#',
		''
	)}/${COLORS.black.replace('#', '')}?text=AARON`,
	jack: `https://via.placeholder.com/512/${COLORS.yellow.replace(
		'#',
		''
	)}/${COLORS.black.replace('#', '')}?text=JACK`,
};
