<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { json } from '@sveltejs/kit';
	import { logEvent } from 'histoire/client';
	import { TabBar, Button } from '../../lib';
	// import source from './source';

	export let Hst: Histoire;

	let id = 'tab-bar';
	let grow = false;
	let disabledIndexes = [1];

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title=" TabBar">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Checkbox
			bind:value={grow}
			title="Grow" />
		<Hst.Json
			bind:value={disabledIndexes}
			title="Disabled indexes" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div id="wrapper">
			<TabBar
				{id}
				{grow}
				{disabledIndexes} />
		</div>
	</Hst.Variant>
</Hst.Story>
