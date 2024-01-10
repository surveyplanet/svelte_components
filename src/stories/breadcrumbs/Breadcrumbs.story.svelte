<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Breadcrumbs, type BreadcrumbData } from '$lib';
	import source from './source';
	export let Hst: Histoire;

	let data: BreadcrumbData[] = [
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
		},
	];
</script>

<Hst.Story title="Breadcrumbs">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Content" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(data)}>
		<Breadcrumbs {data} />
	</Hst.Variant>
</Hst.Story>
