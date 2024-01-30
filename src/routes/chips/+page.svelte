<script lang="ts">
	import { Chips, type ChipData } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

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
		events.push(JSON.stringify(data));
	};
	const chipRemoved = (data: ChipData[]): void => {
		events.push(JSON.stringify(data));
	};

	let stringData = $state(JSON.stringify(data));
	$effect(() => {
		data = JSON.parse(stringData);
	});
</script>

<Layout
	component="Chips"
	example={source(data, selectable, multiSelect, removable)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsChanger
			label="data"
			text
			bind:value={stringData} />
		<PropsChanger
			label="selectable"
			checkbox
			bind:value={selectable} />
		<PropsChanger
			label="multiSelect"
			checkbox
			bind:value={multiSelect} />
		<PropsChanger
			label="removable"
			checkbox
			bind:value={removable} />
	{/snippet}
	{#snippet main()}
		<Chips
			bind:data
			{selectable}
			{multiSelect}
			{removable}
			onclick={chipSelected}
			onremove={chipRemoved} />
	{/snippet}
</Layout>
