<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES } from '../../lib/_definitions';

	import Button from '../../lib/Button.svelte';
	import {
		primary,
		secondary,
		tertiary,
		quaternary,
		dark,
		light,
		disabled,
		rounded,
		argTypes,
	} from './buttonFunctions';
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
		label: 'Secondary',
		mode: BUTTON_MODES.SECONDARY,
	}}
	play={secondary} />

<Story
	name="Tertiary"
	args={{
		label: 'Tertiary',
		mode: BUTTON_MODES.TERTIARY,
	}}
	play={tertiary} />

<Story
	name="Quaternary"
	args={{
		label: 'Quaternary',
		mode: BUTTON_MODES.QUATERNARY,
	}}
	play={quaternary} />

<Story
	name="Dark"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.DARK,
	}}
	play={dark} />

<Story
	name="Light"
	args={{
		label: 'Light',
		mode: BUTTON_MODES.LIGHT,
	}}
	play={light} />

<Story
	name="Disabled"
	args={{
		label: 'Disabled',
		disabled: true,
	}}
	play={disabled} />

<Story
	name="Round"
	args={{
		label: 'Rounded',
		round: true,
	}}
	play={rounded} />
