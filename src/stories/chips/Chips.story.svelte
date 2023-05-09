<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	// import source from './source';
	import { Chips, type ChipData } from '../../lib';
	export let Hst: Histoire;

	let data: ChipData[] = [
		{
			id: 'apple',
			label: 'Apple',
			selected: false,
			title: 'Apple',
		},
		{
			id: 'peach',
			label: 'Peach',
			selected: false,
			title: 'Peach',
		},
		{
			id: 'banana',
			label: 'Banana',
			selected: false,
			title: 'Banana',
		},
		{
			id: 'orange',
			label: 'Orange ',
			selected: false,
			title: 'Orange ',
		},
	];

	let multiple = false;

	const clickEventHandler = (e: CustomEvent) => {
		logEvent('click', e.detail);
	};
</script>

<Hst.Story title="Form controls / Chips">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Data" />
		<Hst.Checkbox
			bind:value={multiple}
			title="Multiple" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<Chips
			{multiple}
			{data}
			on:click={clickEventHandler} />
	</Hst.Variant>
</Hst.Story>
