<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Breadcrumbs } from '$lib';
	import source from './source';
	export let Hst: Histoire;

	let breadcrumbs = [
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
	];
</script>

<Hst.Story title="Breadcrumbs">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={breadcrumbs}
			title="Content" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(breadcrumbs)}>
		<Breadcrumbs {breadcrumbs} />
	</Hst.Variant>
</Hst.Story>
