export default {
	label: { control: 'text' },
	clickHandler: { action: 'SurveyPlanetButtonClickEvent' },
	disabled: { control: 'boolean' },
	loader: { control: 'boolean' },
	mode: {
		control: { type: 'select' },
		options: ['primary', 'secondary', 'tertiary'],
	},
	size: {
		control: { type: 'select' },
		options: ['small', 'medium', 'large'],
	},
	iconOptions: { control: 'object' },
};
