import type { SortListData } from '../../lib/index';
export default (data: SortListData[]) => {
	return `
	import type { ListData } from './types';
	<SortableList
	data={${JSON.stringify(data)}}
/>`;
};
