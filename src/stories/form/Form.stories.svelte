<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Form, Button, TextInput, Radio, Checkbox } from '../../lib';
	// import * as test from './form.test';
</script>

<Meta
	title="Form controls/Form"
	component={Form}
	argTypes={{
		id: { control: 'text' },
		submitEventHandler: { action: 'submit' },
	}} />

<Template let:args>
	<Form
		on:submit={args.submitEventHandler}
		{...args}>
		<TextInput
			name="first_name"
			label="First name" />
		<TextInput
			id="last_name"
			label="Last name" />
		<TextInput
			id="email"
			label="Email" />
		<Radio
			id="radio"
			value="truthiest" />
		<Checkbox
			id="checkbox"
			value="truthiest" />
		<Button>Submit</Button>
	</Form>
</Template>

<Story
	name="Basic"
	let:args />
