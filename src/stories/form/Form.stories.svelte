<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {
		Form,
		Button,
		TextInput,
		Radio,
		Checkbox,
		Toggle,
	} from '../../lib';
	import * as test from './form.test';
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
			label="First name"
			name="name" />
		<TextInput
			id="last_name"
			name="last_name"
			label="Last name" />
		<TextInput
			id="email"
			name="email"
			label="Email" />
		<div>
			<Radio
				id="larry"
				name="stooge"
				value="larry"
				label="Larry" />
			<Radio
				id="curly"
				name="stooge"
				value="curly"
				label="Curly" />
			<Radio
				id="moe"
				name="stooge"
				value="moe"
				label="Moe" />
		</div>

		<Checkbox
			id="checkbox"
			name="checkbox"
			value="checkbox pass" />
		<Toggle
			id="toggle"
			name="toggle" />
		<Button>Submit</Button>
	</Form>
</Template>

<Story
	name="Basic"
	id="basic"
	let:args
	play={test.basic} />
