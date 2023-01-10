<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { defaultToggle, disabled, tall, render } from './toggleFunctions';
	import Toggle from '../../lib/Toggle.svelte';
</script>

<Meta
	title="Toggle/Default"
	component={Toggle} />

<Template let:args>
	<Toggle {...args} />
</Template>

<Story
	name="Default"
	args={{}}
	play={defaultToggle}
	{render} />

<Story
	name="Disabled"
	args={{ disabled: true }}
	play={disabled}
	{render} />

<Story
	name="Tall"
	args={{ tall: true }}
	play={tall}
	{render} />
