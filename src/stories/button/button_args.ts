import { SIZES, BUTTON_MODES } from '../../lib/_definitions';

export default {
	clickHandler: { action: 'click' },
	disabled: { control: 'boolean', defaultValue: false },
	loader: { control: 'boolean', defaultValue: false },
	round: { control: 'boolean', defaultValue: false },
	block: { control: 'boolean', defaultValue: false },
	action: { control: 'boolean', defaultValue: false },
	mode: {
		control: { type: 'select' },
		options: ['primary', 'secondary', 'tertiary', 'quaternary', 'dark'],
		defaultValue: BUTTON_MODES.PRIMARY,
	},
	size: {
		control: { type: 'select' },
		options: ['small', 'medium', 'large'],
		defaultValue: SIZES.MEDIUM,
	},
};
