<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import argTypes from './button_args';
	import Button from '../../lib/Button.svelte';
	import * as test from './button.test';
</script>

<Meta
	title="Button/Disabled"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button {...args} />
</Template>

<Story
	name="Primary"
	args={{
		label: 'Disabled Button',
		disabled: true,
		icon: 'add',
	}}
	play={test.DefaultDisabled} />

<Story
	name="Secondary"
	args={{
		label: 'Disabled Button',
		disabled: true,
		mode: BUTTON_MODES.SECONDARY,
		icon: 'add',
	}}
	play={test.SecondaryDisabled} />

<Story
	name="Tertiary"
	args={{
		label: 'Disabled Button',
		disabled: true,
		mode: BUTTON_MODES.TERTIARY,
		icon: 'add',
	}}
	play={test.TertiaryDisabled} />

<Story
	name="Quaternary"
	args={{
		label: 'Disabled Button',
		disabled: true,
		mode: BUTTON_MODES.QUATERNARY,
		icon: 'add',
	}}
	play={test.QuaternaryDisabled} />

<Story
	name="Dark"
	args={{
		label: 'Disabled Button',
		disabled: true,
		mode: BUTTON_MODES.DARK,
		icon: 'add',
	}}
	play={test.DarkDisabled} />

<Story
	name="Light"
	args={{
		label: 'Disabled Button',
		disabled: true,
		mode: BUTTON_MODES.LIGHT,
		icon: 'add',
	}}
	play={test.LightDisabled} />
