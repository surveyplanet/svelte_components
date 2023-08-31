<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import { TabBar, type TabBarData } from '$lib';
	import { default as source } from './source';

	export let Hst: Histoire;

	let data: TabBarData[] = [
		{
			id: 'edit',
			label: 'Edit',
			selected: true,
			icon: 'edit',
		},
		{
			id: 'preview',
			label: 'Preview',
			icon: 'eye',
		},
		{
			id: 'results',
			label: 'Results',
			icon: 'chartColumn',
			// disabled: true,
		},
	];

	let grow = false;

	let id = (Date.now() + Math.random()).toString(36);

	const tabButtonCli8ckHandler = (event: Event): void => {
		logEvent('tabButton', event);
	};
</script>

<Hst.Story title="TabBar">
	<svelte:fragment slot="controls">
		<Hst.Json
			title="Data"
			bind:value={data} />

		<Hst.Checkbox
			title="Grow"
			bind:value={grow} />

		<Hst.Text
			title="Id"
			bind:value={id} />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(data, grow, id)}>
		<div id="wrapper">
			<TabBar
				{grow}
				{id}
				{data}
				on:tabButton={tabButtonCli8ckHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>
