export const COLORS = {
	slateLighter: '#dcdee1',
	slateLight: '#a2a6af',
	slate: '#737a87',
	slateDark: '#162137',

	lightPurpleLight: '#f4f0ff',
	lightPurple: '#ece5ff',
	lightPurpleDark: '#baa5db',

	purpleLight: '#dbccff',
	purple: '#b598ff',
	purpleDark: '#9a79ed',

	blueLight: '#d8f4fd',
	blue: '#9ee4fa',
	blueDark: '#78c4ee',

	greenLight: '#d9fedb',
	green: '#a1fda5',
	greenDark: '#7be492',

	pinkLight: '#ffd8f1',
	pink: '#ffb1e3',
	pinkDark: '#ea83c5',

	yellowLight: '#fff5bc',
	yellow: '#ffe978',
	yellowDark: '#fac766',

	white: '#ffffff',
	black: '#162137',
} as Record<string, string>;

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
} as Record<string, string>;
