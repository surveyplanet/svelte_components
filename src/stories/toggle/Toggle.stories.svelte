<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { defaultToggle, disabled, tall } from './toggleFunctions';
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
	play={defaultToggle} />

<Story
	name="Disabled"
	args={{ disabled: true }}
	play={disabled} />

<Story
	name="Tall"
	args={{ tall: true }}
	play={tall} />
