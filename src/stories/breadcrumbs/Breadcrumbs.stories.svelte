<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Breadcrumbs from '../../lib/Breadcrumbs.svelte';
	import { play } from './breadcrumbsFunctions';
</script>

<Meta
	title="Breadcrumbs/Default"
	component={Breadcrumbs} />

<Template let:args>
	<Breadcrumbs {...args} />
</Template>

<Story
	name="Basic"
	args={{
		breadcrumbs: [
			{
				name: 'Home',
				url: '/',
			},
			{
				name: 'Our test survey will show you how its done as an example ',
				url: '/about',
			},
			{
				name: 'Contact',
				url: '/contact',
			},
			{
				name: 'Submit',
				url: '/submit',
			},
		],
	}}
	{play} />
