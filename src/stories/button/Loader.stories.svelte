<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, SIZES, Button, Icon } from '../../lib';
	import argTypes from './button_args';
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
	<Button
		{...args}
		disabled={true}
		loader={true}>Button</Button>
</Template>

<Story
	name="Default"
	play={tests.loaderDefault} />

<Story
	name="Secondary large"
	args={{
		mode: BUTTON_MODES.SECONDARY,
		size: SIZES.LARGE,
	}}
	play={tests.loaderSecondaryLarge} />

<Story
	name="Tertiary small"
	args={{
		size: SIZES.SMALL,
		mode: BUTTON_MODES.TERTIARY,
	}}
	play={tests.loaderTertiarySmall} />

<Story
	name="Loader with icon"
	play={tests.loaderWithIcon}>
	<Button
		disabled={true}
		loader={true}
		>Icon loader<Icon name="plus" />
	</Button>
</Story>

<Story
	name="Rounded"
	args={{
		round: true,
	}}
	play={tests.loaderRounded} />
