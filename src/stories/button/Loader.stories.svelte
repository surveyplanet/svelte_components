<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import { argTypes } from './buttonFunctions';
	import Button from '../../lib/Button.svelte';
	import {
		LoaderDefault,
		LoaderSecondaryLarge,
		DefaultSmall,
		Primary,
		LoaderTertiarySmall,
		LoaderWithIcon,
		LoaderRounded,
	} from './loaderFunctions';
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
	play={LoaderDefault} />

<Story
	name="Loader Secondary Large"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		mode: BUTTON_MODES.SECONDARY,
		size: BUTTON_SIZES.LARGE,
	}}
	play={LoaderSecondaryLarge} />

<Story
	name="Loader Tertiary Small"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		mode: BUTTON_MODES.TERTIARY,
		size: BUTTON_SIZES.SMALL,
	}}
	play={LoaderTertiarySmall} />

<Story
	name="Loader With Icon"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		icon: 'add',
	}}
	play={LoaderWithIcon} />

<Story
	name="Loader Rounded"
	args={{
		label: 'Loader',
		disabled: true,
		loader: true,
		round: true,
	}}
	play={LoaderRounded} />

<!-- <Story
	name="Default Small"
	args={{
		size: BUTTON_SIZES.SMALL,
		Loader: true,
	}}
	play={DefaultSmall} />

<Story
	name="Loader Primary"
	args={{
		loader: true,
		label: 'Loader',
	}}
	play={Primary} /> -->
