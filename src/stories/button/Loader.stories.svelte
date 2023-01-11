<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import argTypes from './button_args';
	import Button from '../../lib/Button.svelte';
	import * as test from './button.test';
</script>

<Meta
	title="Button/Loader"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button {...args} />
</Template>

<Story
	name="Loader Default"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
	}}
	play={test.LoaderDefault} />

<Story
	name="Loader Secondary Large"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		size: BUTTON_SIZES.LARGE,
	}}
	play={test.LoaderSecondaryLarge} />
<Story
	name="Default Small"
	args={{
		label: 'Default',
		disabled: true,
		loader: true,
		size: BUTTON_SIZES.SMALL,
	}}
	play={test.DefaultSmall} />
<Story
	name="Loader Tertiary Small"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		size: BUTTON_SIZES.SMALL,
		mode: BUTTON_MODES.TERTIARY,
	}}
	play={test.LoaderTertiarySmall} />
<Story
	name="Loader With Icon"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		icon: 'search',
	}}
	play={test.LoaderWithIcon} />
<Story
	name="Loader Rounded"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		rounded: true,
	}}
	play={test.LoaderRounded} />
