<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { NavBar, NavBarData } from '../../lib/index';
	import { json } from '@sveltejs/kit';
	export let Hst: Histoire;

	let data: NavBarData[] = [
		{
			icon: 'edit',
			link: '#',
		},
		{
			icon: 'chartColumn',
			link: '#',
		},
		{
			icon: 'share',
			link: '#',
		},
		{
			icon: 'ellipses',
			link: '#',
		},
	];
</script>

<Hst.Story title="NavBar">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Data" />
	</svelte:fragment>

	<Hst.Variant title="NavBar">
		<NavBar {data} />
	</Hst.Variant>
</Hst.Story>
