import type { ArgTypes } from '@storybook/svelte';

export default {
	label: { control: 'text' },
	clickHandler: { action: 'SurveyPlanetButtonClickEvent' },
	disabled: { control: 'boolean' },
	loader: { control: 'boolean' },
	round: { control: 'boolean' },
	mode: {
		control: { type: 'select' },
		options: ['primary', 'secondary', 'tertiary', 'quaternary', 'dark'],
	},
	size: {
		control: { type: 'select' },
		options: ['small', 'medium', 'large'],
	},
	icon: {
		control: { type: 'select' },
		options: ['add', 'search', 'delete', 'close', 'menu'],
	},
} as ArgTypes;
