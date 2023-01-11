<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_SIZES } from '../../lib/_definitions';
	import { argTypes } from './button_args';
	import Button from '../../lib/Button.svelte';
	import { Small, Large, Medium } from './sizeFunctions';
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
	play={Small} />

<Story
	name="Medium"
	args={{
		label: 'Medium',
	}}
	play={Medium} />

<Story
	name="Large"
	args={{
		label: 'Large',
		size: BUTTON_SIZES.LARGE,
	}}
	play={Large} />
