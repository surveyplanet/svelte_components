<script lang="ts">
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
	args={{
		attr: { 'data-testid': 'form-test' },
	}}
	argTypes={{
		id: { control: 'text' },
		attr: { control: 'object' },
		submitHandler: { action: 'submit' },
	}} />

<Template let:args>
	<Form
		{...args}
		on:submit={args.submitHandler}>
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
		<div style="display: flex;">
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
			label="Accept"
			value="checkbox pass" />
		<Toggle
			id="toggle"
			name="toggle" />
		<Button type="submit">Submit</Button>
	</Form>
</Template>

<Story
	name="Basic"
	id="basic"
	play={test.basic} />
