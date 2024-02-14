import type { SortListData } from '../../lib/index';
export default (data: SortListData[]) => {
	return `
<script lang="ts">
	import { SortableList, type SortListData } from '@surveyplanet/svelte-components';

	const onSortSort = (data: SortListData[]): void => {
		console.log(data);
	};
	let data: SortListData[] = ${JSON.stringify(data, null, 2)};
</script>
	
<SortableList 
	{data}
	{onSortSort}
/>`;
};
