<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { SIZES, Button } from '../../lib';
	import argTypes from './button_args';
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
		size: SIZES.SMALL,
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
		size: SIZES.LARGE,
	}}
	play={test.large} />
