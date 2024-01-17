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

	const tabButtonClickHandler = (event: Event): void => {
		events.push((event.target as HTMLButtonElement).id);	};
</script>

	<Layout
		component="TabBar"
		example={source(data, grow, id)}
		{md}
		{events}>
		<svelte:fragment slot="main">
			<PropsContainer>
				<PropsChanger
					object="data"
					value={JSON.stringify(data)}
					textInputHandler={(e: Event) => {
						data = JSON.parse((e.target as HTMLInputElement).value)
					}}
				/>
				<PropsChanger
					boolean="grow"
					value={grow}
					booleanInputHandler={(e: Event) => {
						grow = (e.target as HTMLInputElement).checked
					}}
				/>
				<PropsChanger
					text="id"
					value={id}
					textInputHandler={(e: Event) => {
						id = (e.target as HTMLInputElement).value
					}}
				/>
			</PropsContainer>
			<TabBar
				on:tabButtonClick={tabButtonClickHandler}
				data={data}
				grow={grow}
				id={id}
			/>
		</svelte:fragment>
	</Layout>