<script lang="ts">
	import { TabBar, type TabBarData } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

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
</script>

<Layout
	component="TabBar"
	example={source(data, grow, id)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				object="data"
				value={JSON.stringify(data)}
				oninput={(e: Event) => {
						data = JSON.parse((e.target as HTMLInputElement).value)
					}} />
			<PropsChanger
				boolean="grow"
				value={grow}
				oninput={(e: Event) => {
						grow = (e.target as HTMLInputElement).checked
					}} />
			<PropsChanger
				text="id"
				value={id}
				oninput={(e: Event) => {
						id = (e.target as HTMLInputElement).value
					}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<TabBar
			tabButton={tabButtonClickHandler}
			{data}
			{grow}
			{id} />
	{/snippet}
</Layout>
