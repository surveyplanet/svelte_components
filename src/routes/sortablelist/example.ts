import type { SortListData } from '../../lib/index';
export default (data: SortListData[]) => {
	return `
	import { SortableList } from '@surveyplanet/svelte-components';
	<SortableList data={${JSON.stringify(data)}} />`;
};
