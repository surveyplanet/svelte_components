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
	<Button {...args} />
</Template>

<Story
	name="Small"
	args={{
		label: 'Small',

		size: BUTTON_SIZES.SMALL,
	}}
	play={test.Small} />

<Story
	name="Medium"
	args={{
		label: 'Medium',
	}}
	play={test.Medium} />

<Story
	name="Large"
	args={{
		label: 'Large',
		size: BUTTON_SIZES.LARGE,
	}}
	play={test.Large} />
