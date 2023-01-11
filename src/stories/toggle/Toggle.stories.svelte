<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Toggle from '../../lib/Toggle.svelte';
	import * as test from './toggle.test';
</script>

<Meta
	title="Toggle/Default"
	component={Toggle} />

<Template let:args>
	<Toggle {...args} />
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
	args={{ tall: true }}
	play={test.tall} />
