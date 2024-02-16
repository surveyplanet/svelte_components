import type { SortListData } from '../../lib/index';
export default (data: SortListData[]) => {
	return `
<script lang="ts">
	import { SortableList, ComponentEvent, type SortListData } from '@surveyplanet/svelte-components';

	const onSortSort = (event: ComponentEvent<SortListData[]>): void => {
		console.log(event.value);
	};
	let data: SortListData[] = ${JSON.stringify(data, null, 2)};
</script>
	
<SortableList 
	{data}
	{onSortSort}
/>`;
};
