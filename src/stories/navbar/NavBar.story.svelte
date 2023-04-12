<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { NavBar, Button } from '../../lib';
	import { json } from '@sveltejs/kit';
	export let Hst: Histoire;

	let data = [
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

<style>
	.button-for-tests {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
