export default {
	type: { control: 'select', options: ['checkbox', 'radio'] },
	id: { control: 'text', defaultValue: 'checkradio' },
	label: { control: 'text', defaultValue: 'CheckRadio' },
	checked: { control: 'boolean', defaultValue: false },
	attr: { control: 'object', defaultValue: {} },
	disabled: { control: 'boolean', defaultValue: false },
	prependLabel: { control: 'boolean', defaultValue: false },
};
