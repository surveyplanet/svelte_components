import type { SortListData } from '../../lib/index';
export default (data: SortListData[]) => {
	return `
<script>

	import { SortableList } from '@surveyplanet/svelte-components';

</script>
	
<SortableList 
	data=${JSON.stringify(data, null, 2)}
	
	/>`;
};
