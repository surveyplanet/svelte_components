<script lang="ts">
	import { SortableList, type SortListData } from '../../lib/index';
	import {
		Layout,
		//  PropsChanger
	} from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<SortListData[][]>([]);

	let data: SortListData[] = $state([
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
	const sortableListSortHandler = (sortData: SortListData[]) => {
		events.push(sortData);
	};

	// let dataStringed = $state(JSON.stringify(data));

	// $effect(() => {
	// 	data = JSON.parse(dataStringed);
	// });
</script>

<Layout
	component="SortableList"
	example={source(data)}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Data"
			bind:value={dataStringed} /> -->
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
