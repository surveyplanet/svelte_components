<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { TextInput } from '../../lib';
	import * as test from './textinput.test';
</script>

<Meta
	title="Form inputs/Text Input"
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
		validationRules: { control: { type: 'text' } },
		validationMessage: { control: { type: 'text' } },
		validationHidMessage: {
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
		label: 'Label',
		id: 'email',
		name: 'email',
		placeholder: 'Placeholder',
		attr: { 'data-test': 'test', 'data-test2': 'test2' },
	}}
	play={test.basic} />

<Story
	name="Multiline"
	args={{
		label: 'Label',
		id: 'text-input-id',
		placeholder: 'Placeholder',
		multiline: true,
		attr: { 'data-test': 'test', 'data-test2': 'test2' },
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
	play={test.readonly} />

<Story
	name="No label"
	args={{
		id: 'text-input-id',
		placeholder: 'Placeholder',
	}}
	play={test.noLabel} />

<Story
	name="Validate"
	args={{
		id: 'text-input-id',
		label: 'Email require',
		placeholder: 'Email require',
		validationRules: 'require,email',
	}}
	play={test.noLabel} />
