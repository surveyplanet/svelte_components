<script lang="ts">
	import { TabBar, type TabBarData } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);
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

	let grow = $state(false);

	let id = $state((Date.now() + Math.random()).toString(36));

	const tabButtonClickHandler = (id: string): void => {
		console.log(id);
		events.push(id);
	};

	let dataStringed = $state(JSON.stringify(data));

	$effect(() => {
		data = JSON.parse(dataStringed);
	});
</script>

<Layout
	component="TabBar"
	example={source(data, grow, id)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsChanger
			label="data"
			object
			bind:value={dataStringed} />
		<PropsChanger
			label="grow"
			checkbox
			bind:value={grow} />
		<PropsChanger
			label="id"
			text
			bind:value={id} />
	{/snippet}
	{#snippet main()}
		<TabBar
			tabButton={tabButtonClickHandler}
			bind:data
			{grow}
			{id} />
	{/snippet}
</Layout>
