<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Primary, Inverted } from './badgeFunctions';
	import Badge from '../../lib/Badge.svelte';
</script>

<Meta
	title="Badge/Default"
	component={Badge} />

<Template let:args>
	<Badge {...args} />
</Template>

<Story
	name="Primary"
	args={{
		label: 'PRO',
	}}
	play={Primary} />
<Story
	name="Inverted"
	source
	args={{ label: 'Inverted', color: 'black', labelColor: 'white' }}
	play={Inverted} />
