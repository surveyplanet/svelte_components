<script lang="ts">
	import {
		Chips,
		type ChipsProps,
		type ChipData,
		ComponentEvent,
	} from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<ChipData[]>[] = $state([]);

	let data: ChipsProps['data'] = $state([
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

	let selectable: ChipsProps['selectable'] = $state(true);
	let multiSelect: ChipsProps['multiSelect'] = $state(false);
	let removable: ChipsProps['removable'] = $state(false);

	const onChipsClick = (event: ComponentEvent<ChipData[]>): void => {
		events.push(event);
	};
	const onChipsRemove = (event: ComponentEvent<ChipData[]>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Chips"
	example={source({ data, selectable, multiSelect, removable })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			bind:value={data} />
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
			{onChipsClick}
			{onChipsRemove} />
	{/snippet}
</Layout>
