<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES } from '../../lib/_definitions';

	import Button from '../../lib/Button.svelte';
	import { primary, secondary, tertiary } from './buttonFunctions';

	const argTypes = {
		label: { control: 'text' },
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
	};
</script>

<Meta
	title="Button/Default"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button {...args} />
</Template>

<Story
	name="Primary"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.PRIMARY,
	}}
	play={primary} />

<Story
	name="Secondary"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.SECONDARY,
	}}
	play={secondary} />

<Story
	name="Tertiary"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.TERTIARY,
	}}
	play={tertiary} />

<Story
	name="Quaternary"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.QUATERNARY,
	}} />

<Story
	name="Dark"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.DARK,
	}} />
