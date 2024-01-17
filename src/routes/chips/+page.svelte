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

	const chipSelected = (): void => {
		events.push('chipSelected');
	};
	const chipRemoved = (): void => {
		events.push('chipRemoved');
	};
</script>

<Layout
	component="Chips"
	example={source(data, selectable, multiSelect, removable)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="data"
				value={JSON.stringify(data)}
				textInputHandler={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value)
				}} />
			<PropsChanger
				boolean="selectable"
				value={selectable}
				booleanInputHandler={(e: Event) => {
					selectable = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="multiSelect"
				value={multiSelect}
				booleanInputHandler={(e: Event) => {
					multiSelect = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="removable"
				value={removable}
				booleanInputHandler={(e: Event) => {
					removable = (e.target as HTMLInputElement).checked;
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Chips
			{data}
			{selectable}
			{multiSelect}
			{removable}
			on:click={chipSelected}
			on:remove={chipRemoved} />
	</svelte:fragment>
</Layout>
