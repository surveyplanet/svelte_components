<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import source from './source';
	import { Chips, type ChipData } from '$lib';
	export let Hst: Histoire;

	let data: ChipData[] = [
		{
			id: 'apple',
			label: 'Apple',
			selected: false,
		},
		{
			id: 'peach',
			label: 'Peach',
			selected: false,
		},
		{
			id: 'banana',
			label: 'Banana',
			selected: false,
		},
		{
			id: 'orange',
			label: 'Orange ',
			selected: false,
		},
	];

	let selectable = true;
	let multiSelect = false;
	let removable = false;

	const eventHandler = (e: CustomEvent) => {
		logEvent(e.type, e.detail);
	};
</script>

<Hst.Story title="Form controls / Chips">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Data" />
		<Hst.Checkbox
			bind:value={removable}
			title="Removable" />
		<Hst.Checkbox
			bind:value={selectable}
			title="Selectable" />
		{#if selectable}
			<Hst.Checkbox
				bind:value={multiSelect}
				title="Multi select" />
		{/if}
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(data, removable, selectable, multiSelect)}>
		<Chips
			bind:data
			bind:removable
			bind:selectable
			bind:multiSelect
			on:click={eventHandler}
			on:remove={eventHandler} />
	</Hst.Variant>
</Hst.Story>
