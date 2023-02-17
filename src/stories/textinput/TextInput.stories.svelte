<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { TextInput } from '../../lib';
	import * as test from './textinput.test';
</script>

<Meta
	title="Form controls/Text Input"
	component={TextInput}
	argTypes={{
		id: { control: { type: 'text' }, defaultValue: 'text-input-id' },
		value: { control: { type: 'text' }, defaultValue: 'Hello' },
		label: { control: { type: 'text' }, defaultValue: 'Label' },
		placeholder: { control: { type: 'text' }, defaultValue: 'Placeholder' },
		multiline: { control: { type: 'boolean' }, defaultValue: false },
		readonly: { control: { type: 'boolean' }, defaultValue: false },
		attr: { control: { type: 'object' }, defaultValue: {} },
		disabled: { control: { type: 'boolean' }, defaultValue: false },
		cleaveOptions: { control: { type: 'object' } },
		validationRules: { control: { type: 'array' } },
		validationMessage: { control: { type: 'text' } },
		validationHideMessage: {
			control: { type: 'boolean' },
			defaultValue: false,
		},
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
		label: 'Text input',
		id: 'email',
		name: 'email',
		placeholder: 'Placeholder',
		attr: { 'data-test': 'test', 'data-test2': 'test2' },
	}}
	play={test.basic} />

<Story
	name="Multiline"
	args={{
		label: 'Multiline input',
		id: 'text-input-id',
		placeholder: 'Placeholder',
		multiline: true,
		name: 'multilineInput',
		attr: { 'data-test': 'test', 'data-test2': 'test2' },
	}}
	play={test.multiline} />

<Story
	name="Disabled"
	args={{
		value: 'Hello World',
		label: 'Disabled input',
		placeholder: 'Placeholder',
		name: 'disabledInput',
		disabled: true,
	}}
	play={test.disabled} />

<Story
	name="Readonly"
	args={{
		label: 'Read only input',
		value: 'Readonly',
		name: 'readonlyInput',
		readonly: true,
		disabled: false,
	}}
	play={test.readonly} />

<Story
	name="No label"
	args={{
		id: 'text-input-id',
		placeholder: 'No label',
		name: 'noLabel',
	}}
	play={test.noLabel} />

<Story
	name="Validate"
	args={{
		id: 'email',
		label: 'Validate',
		placeholder: 'Email',
		validationRules: ['require', 'email'],
		name: 'validateThis',
		validationMessage:
			"What's the matter with you, you don't know your email address?",
	}}
	play={test.validate} />

<Story
	name="Masked"
	args={{
		id: 'masked',
		label: 'Masked',
		placeholder: 'YYYY-MM-DD',
		name: 'masked',
		cleaveOptions: {
			date: true,
			delimiter: '-',
			datePattern: ['Y', 'm', 'd'],
		},
	}}
	play={test.masked} />
