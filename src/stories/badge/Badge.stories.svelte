<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Primary, Inverted } from './badge.test';
	import Badge from '../../lib/Badge.svelte';
</script>

<Meta
	title="Badge/Default"
	component={Badge} />

<Template let:args>
	<Badge {...args} />
</Template>

<Story
	name="Badge Primary"
	args={{
		label: 'PRO',
	}}
	play={Primary} />

<Story
	name="Badge Inverted"
	source
	args={{ label: 'Inverted', color: 'black', labelColor: 'white' }}
	play={Inverted} />
