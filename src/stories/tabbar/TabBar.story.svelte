<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import { TabBar, type TabBarData } from '../../lib';
	// import source from './source';

	export let Hst: Histoire;

	let data: TabBarData[] = [
		{
			id: 'tab1',
			label: 'Tab 1',
			selected: true,
			icon: 'edit',
		},
		{
			id: 'tab2',
			label: 'Tab 2',
			icon: 'tablet',
		},
		{
			id: 'tab3',
			label: 'Tab 3',
			icon: 'monitor',
			disabled: true,
		},
	];

	let grow = false;

	let id = (Date.now() + Math.random()).toString(36);

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title=" TabBar">
	<svelte:fragment slot="controls">
		<Hst.Json
			title="Data"
			bind:value={data}
			on:change={changeEventHandler} />
		<Hst.Checkbox
			title="Grow"
			bind:value={grow}
			on:change={changeEventHandler} />

		<Hst.Text
			title="Id"
			bind:value={id}
			on:change={changeEventHandler} />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div id="wrapper">
			<TabBar
				{grow}
				{id}
				{data} />
		</div>
	</Hst.Variant>
</Hst.Story>
