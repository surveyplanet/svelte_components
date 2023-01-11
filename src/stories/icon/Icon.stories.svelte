<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Icon from '../../lib/Icon.svelte';
	import { basic, light } from './icon.test';
</script>

<Meta
	title="Icon/Default"
	component={Icon} />

<Template let:args>
	<Icon {...args} />
</Template>

<Story
	name="Basic"
	args={{
		name: 'search',
		color: 'black',
	}}
	play={basic} />

<Story
	name="Light"
	source
	args={{
		name: 'search',
		color: 'white',
	}}
	parameters={{
		backgrounds: {
			default: 'darkest',
		},
	}}
	play={light} />
