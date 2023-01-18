<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_SIZES } from '../../lib/_definitions';
	import argTypes from './button_args';
	import Button from '../../lib/Button.svelte';
	import * as test from './button.test';
</script>

<Meta
	title="Button/Size"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button {...args}>Button</Button>
</Template>

<Story
	name="Small"
	args={{
		size: BUTTON_SIZES.SMALL,
	}}
	play={test.small} />

<Story
	name="Medium"
	args={{
		label: 'Medium',
	}}
	play={test.medium} />

<Story
	name="Large"
	args={{
		size: BUTTON_SIZES.LARGE,
	}}
	play={test.large} />
