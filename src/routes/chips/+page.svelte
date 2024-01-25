<script lang="ts">
	import { Chips, type ChipData } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let data: ChipData[] = $state([
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
</script>

<Layout
	component="Chips"
	example={source(data, selectable, multiSelect, removable)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="data"
				value={JSON.stringify(data)}
				oninput={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value)
				}} />
			<PropsChanger
				boolean="selectable"
				value={selectable}
				oninput={(e: Event) => {
					selectable = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="multiSelect"
				value={multiSelect}
				oninput={(e: Event) => {
					multiSelect = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="removable"
				value={removable}
				oninput={(e: Event) => {
					removable = (e.target as HTMLInputElement).checked;
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Chips
			{data}
			{selectable}
			{multiSelect}
			{removable}
			onclick={chipSelected}
			onremove={chipRemoved} />
	{/snippet}
</Layout>
