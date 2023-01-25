<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { TextInput } from '../../lib';
	import * as test from './textinput.test';
</script>

<Meta
	title="TextInput/Default"
	component={TextInput}
	argTypes={{
		value: { control: 'text' },
		label: { control: 'text' },
		placeholder: { control: 'text' },
		multiline: { control: 'boolean' },
		readonly: { control: 'boolean' },
		attr: { control: 'object' },
		disabled: { control: 'boolean' },
		validate: { control: 'text' },
		changeHandler: { action: 'change' },
		focusHandler: { action: 'focus' },
		blurHandler: { action: 'blur' },
		keydownHandler: { action: 'keydown' },
		keyupHandler: { action: 'keyup' },
	}} />

<Template let:args>
	<TextInput
		{...args}
		on:blur={args.blurHandler}
		on:change={args.changeHandler}
		on:focus={args.focusHandler}
		on:keydown={args.keydownHandler}
		on:keyup={args.keyupHandler} />
</Template>

<Story
	name="Basic"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',
	}}
	play={test.basic} />

<Story
	name="Multiline"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',
		multiline: true,
	}}
	play={test.multiline} />

<Story
	name="Disabled"
	args={{
		value: 'Hello World',
		label: 'Label',
		placeholder: 'Placeholder',

		disabled: true,
	}}
	play={test.disabled} />

<Story
	name="Readonly"
	args={{
		label: 'Label',
		placeholder: 'Readonly',

		readonly: true,

		disabled: false,
	}}
	play={test.placeholder} />

<Story
	name="Custom Attributes"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',

		attr: {
			'data-test': 'test',
			'data-test2': 'test2',
		},
	}}
	play={test.customAttributes} />
