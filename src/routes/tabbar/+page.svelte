<script lang="ts">
	import { TabBar, type TabBarData } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state<string[]>([]);

	// let keys = $state(0);
	let data: TabBarData[] = $state([
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
	]);

	let block = $state(false);
	let id = $state((Date.now() + Math.random()).toString(36));
	let defaultIndicatorWidth = $state(114);
	let defaultIndicatorX: number | undefined = $state();

	const tabButtonClickHandler = (id: string): void => {
		events.push(id);
	};

	// let dataStringed = $state(JSON.stringify(data));

	// $effect(() => {
	// 	data = JSON.parse(dataStringed);
	// });
</script>

<Layout
	component="TabBar"
	example={source({ data, block, id })}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Data"
			bind:value={dataStringed} /> -->
		<PropsChanger
			label="Block"
			bind:value={block} />
		<PropsChanger
			label="Id"
			bind:value={id} />
		<PropsChanger
			label="Default indicator width"
			bind:value={defaultIndicatorWidth} />
		<PropsChanger
			label="Default indicator X position"
			type="number"
			bind:value={defaultIndicatorX} />
	{/snippet}
	{#snippet main()}
		<TabBar
			onTabClick={tabButtonClickHandler}
			bind:data
			{block}
			{defaultIndicatorWidth}
			{defaultIndicatorX}
			{id} />
	{/snippet}
</Layout>
