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
		on:blur{blurHandler}
		on:change{changeHandler}
		on:focus{focusHandler}
		on:keydown{keydownHandler}
		on:keyup{keyupHandler} />
</Template>

<Story
	name="Basic"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',
		multiline: false,
		readonly: false,
		attr: {},
		disabled: false,
		validate: '',
	}}
	play={test.basic} />

<Story
	name="Multiline"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',
		multiline: true,
		readonly: false,
		attr: {},
		disabled: false,
		validate: '',
	}}
	play={test.multiline} />

<Story
	name="Disabled"
	args={{
		value: 'Hello World',
		label: 'Label',
		placeholder: 'Placeholder',
		multiline: false,
		readonly: false,
		attr: {},
		disabled: true,
		validate: '',
	}}
	play={test.disabled} />

<Story
	name="Readonly"
	args={{
		label: 'Label',
		placeholder: 'Readonly',
		multiline: false,
		readonly: true,
		attr: {},
		disabled: false,
		validate: '',
	}}
	play={test.placeholder} />

<Story
	name="Custom Attributes"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',
		multiline: false,
		readonly: false,
		attr: {
			'data-test': 'test',
			'data-test2': 'test2',
		},
		disabled: false,
		validate: '',
	}}
	play={test.customAttributes} />
