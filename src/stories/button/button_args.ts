import { BUTTON_SIZES, BUTTON_MODES } from '../../lib/_definitions';

export default {
	label: { control: 'text' },
	disabled: { control: 'boolean', defaultValue: false },
	loader: { control: 'boolean', defaultValue: false },
	round: { control: 'boolean', defaultValue: false },
	block: { control: 'boolean', defaultValue: false },
	mode: {
		control: { type: 'select' },
		options: ['primary', 'secondary', 'tertiary', 'quaternary', 'dark'],
		defaultValue: BUTTON_MODES.PRIMARY,
	},
	size: {
		control: { type: 'select' },
		options: ['small', 'medium', 'large'],
		defaultValue: BUTTON_SIZES.MEDIUM,
	},
	icon: {
		control: { type: 'select' },
		options: ['add', 'search', 'delete', 'close', 'menu'],
	},
};
