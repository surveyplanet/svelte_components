<script lang="ts">
	import { Chips, type ChipData } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ChipData[][]>([]);

	let data: ChipData[] = $state([
		{
			id: 'apple',
			label: 'Apple',
			selected: true,
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
	]);

	let selectable = $state(true);
	let multiSelect = $state(false);
	let removable = $state(false);

	const chipSelected = (data: ChipData[]): void => {
		// data.forEach((chip) => events.push(chip));
		events.push(data);
	};
	const chipRemoved = (data: ChipData[]): void => {
		events.push(data);
	};

	// let stringData = $state(JSON.stringify(data));
	// $effect(() => {
	// 	data = JSON.parse(stringData);
	// });
</script>

<Layout
	component="Chips"
	example={source(data, selectable, multiSelect, removable)}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Data"
			bind:value={stringData} /> -->
		<PropsChanger
			label="Selectable"
			bind:value={selectable} />
		<PropsChanger
			label="MultiSelect"
			bind:value={multiSelect} />
		<PropsChanger
			label="Removable"
			bind:value={removable} />
	{/snippet}
	{#snippet main()}
		<Chips
			bind:data
			{selectable}
			{multiSelect}
			{removable}
			onClick={chipSelected}
			onRemove={chipRemoved} />
	{/snippet}
</Layout>
