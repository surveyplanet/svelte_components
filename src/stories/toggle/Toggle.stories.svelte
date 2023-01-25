<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Toggle } from '../../lib';
	import * as test from './toggle.test';
</script>

<Meta
	title="Toggle/Default"
	component={Toggle}
	argTypes={{
		changeHandler: { action: 'change' },
		on: { control: 'boolean', defaultValue: false },
		disabled: { control: 'boolean', defaultValue: false },
		tall: { control: 'boolean', defaultValue: false },
	}} />

<Template let:args>
	<Toggle
		{...args}
		on:change={args.changeHandler} />
</Template>

<Story
	name="Default"
	play={test.basic} />

<Story
	name="Disabled"
	args={{ disabled: true }}
	play={test.disabled} />

<Story
	name="Tall"
	args={{ tall: true, on: false }}
	play={test.tall} />
