<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { SortableList, type ListData } from '../../lib/index';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

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
		logEvent('sort', event.detail);
	};
</script>

<Hst.Story title="SortableList">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Data" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(data)}>
		<div class="wrapper">
			<SortableList
				on:sort={sortableListSortHandler}
				{data} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
