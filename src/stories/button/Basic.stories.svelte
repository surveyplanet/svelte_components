<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import Button from '../../lib/Button.svelte';
	import * as test from './button.test';
	import argTypes from './button_args';
	// import Documentation from './button.mdx';
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
	play={test.primary} />

<Story
	name="Secondary"
	args={{
		label: 'Secondary',
		mode: BUTTON_MODES.SECONDARY,
	}}
	play={test.secondary} />

<Story
	name="Tertiary"
	args={{
		label: 'Tertiary',
		mode: BUTTON_MODES.TERTIARY,
	}}
	play={test.tertiary} />

<Story
	name="Quaternary"
	args={{
		label: 'Quaternary',
		mode: BUTTON_MODES.QUATERNARY,
	}}
	play={test.quaternary} />

<Story
	name="Dark"
	args={{
		label: 'Button',
		mode: BUTTON_MODES.DARK,
	}}
	play={test.dark} />

<Story
	name="Light"
	args={{
		label: 'Light',
		mode: BUTTON_MODES.LIGHT,
	}}
	play={test.light} />

<Story
	name="Disabled"
	args={{
		label: 'Disabled',
		disabled: true,
	}}
	play={test.disabled} />

<Story
	name="Round"
	args={{
		label: 'Rounded',
		round: true,
	}}
	play={test.rounded} />

<Story
	name="Block"
	args={{
		label: 'Button should take up all available horizontal space.',
		block: true,
		size: BUTTON_SIZES.LARGE,
	}}
	play={test.block} />
