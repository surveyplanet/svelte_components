<script lang="ts">
	import { ComponentEvent, TabBar, type TabBarData } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state<string[]>([]);

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
		{
			id: 'go',
			label: 'Go there',
			icon: 'open',
			link: 'https://svelte.dev',
		},
	]);

	let block = $state(false);
	let defaultIndicatorWidth = $state(114);
	let defaultIndicatorX: number | undefined = $state(4);

	const tabButtonClickHandler = (event: ComponentEvent<string>): void => {
		events.push(event.value!);
	};
</script>

<Layout
	component="TabBar"
	example={source({ data, block, defaultIndicatorWidth, defaultIndicatorX })}
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
			label="Default indicator width"
			bind:value={defaultIndicatorWidth} />
		<PropsChanger
			label="Default indicator X position"
			bind:value={defaultIndicatorX} />
	{/snippet}
	{#snippet main()}
		<TabBar
			onTabClick={tabButtonClickHandler}
			bind:data
			{block}
			{defaultIndicatorWidth}
			{defaultIndicatorX} />
	{/snippet}
</Layout>
