<script lang="ts">
	import { SortableList, type SortListData } from '../../lib/index';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

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
		events.push(JSON.stringify(sortData));
	};
</script>

<Layout
	component="SortableList"
	example={source(data)}
	{md}
	{events}>
	{#snippet controls()}
		Needs events reworked!!!
		<PropsChanger
			object="Data"
			value={JSON.stringify(data)}
			oninput={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value);
				}} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<SortableList
				sort={sortableListSortHandler}
				{data} />
		</div>
	{/snippet}
</Layout>

<style lang="scss"></style>
