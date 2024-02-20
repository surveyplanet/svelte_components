<script lang="ts">
	import {
		ComponentEvent,
		SortableList,
		type SortListData,
		type SortListProps,
	} from '../../lib/index';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<SortListData[]>[]>([]);

	let data: SortListProps['data'] = $state([
		{
			label: 'Nice',
			meta: 'image',
			image: 'https://picsum.photos/200/100',
		},
		{
			label: 'Nicer',
			meta: 'image',
			image: 'https://picsum.photos/200/200',
		},
		{
			label: 'Nicest ',
			meta: 'image',
			image: 'https://picsum.photos/200/300',
		},
	]);
	const sortableListSortHandler = (event: ComponentEvent<SortListData[]>) => {
		events.push(event);
	};
</script>

<Layout
	component="SortableList"
	example={source(data)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			bind:value={data} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<SortableList
				onSortSort={sortableListSortHandler}
				bind:data />
		</div>
	{/snippet}
</Layout>

<style lang="scss"></style>
