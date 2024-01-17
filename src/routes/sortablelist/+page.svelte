<script lang="ts">
	import { SortableList, type ListData } from '../../lib/index';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	// Component props
	let data: ListData[] = [
		{
			name: 'Orange',
			meta: 'Subtitle',
			image: 'https://picsum.photos/200/100',
		},
		{
			name: 'Apple',
			meta: 'Surprise',
			image: 'https://picsum.photos/200/200',
		},
		{
			name: 'Banana',
			meta: 'Subtitle',
			image: 'https://picsum.photos/200/300',
		},
	];
	const sortableListSortHandler = (event: CustomEvent) => {
		events.push('sort');
	};
</script>

<Layout
	component="SortableList"
	example={source(data)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Data"
				value={JSON.stringify(data)}
				textInputHandler={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value);
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<SortableList
				on:sort={sortableListSortHandler}
				{data} />
		</div>
	</svelte:fragment>
</Layout>

<style lang="scss"></style>
