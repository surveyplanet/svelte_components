<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import argTypes from './button_args';
	import Button from '../../lib/Button.svelte';
	import Icon from '../../lib/Icon.svelte';
	import * as tests from './button.test';
</script>

<Meta
	title="Button/Loader"
	component={Button}
	argTypes={{
		...argTypes,
		disabled: { control: 'boolean', defaultValue: true },
		loader: { control: 'boolean', defaultValue: true },
	}} />

<Template let:args>
	<Button {...args}>Button</Button>
</Template>

<Story
	name="Default"
	play={tests.loaderDefault} />

<Story
	name="Loader secondary large"
	args={{
		mode: BUTTON_MODES.SECONDARY,
		size: BUTTON_SIZES.LARGE,
	}}
	play={tests.loaderSecondaryLarge} />

<Story
	name="Loader tertiary small"
	args={{
		size: BUTTON_SIZES.SMALL,
		mode: BUTTON_MODES.TERTIARY,
	}}
	play={tests.loaderTertiarySmall} />

<Story
	name="Loader with icon"
	play={tests.loaderWithIcon}>
	<Button
		disabled={true}
		loader={true}
		>Icon loader<Icon name="add" />
	</Button>
</Story>

<Story
	name="Loader rounded"
	args={{
		round: true,
	}}
	play={tests.loaderRounded} />
