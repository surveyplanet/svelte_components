<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { TextInput } from '../../lib';
	import * as test from './form.test';
</script>

<Meta
	title="Form controls/Text Input"
	component={TextInput}
	argTypes={{
		id: { control: 'text' },
		trigger: { control: 'text' },
	}} />

<Template let:args>
	<TextInput {...args} />
</Template>

<Story name="Basic" />
