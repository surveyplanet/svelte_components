import type { ListData } from '../../lib/index';
export default (data: ListData[]) => {
	return `
	import type { ListData } from './types';
	<SortableList
	data={${JSON.stringify(data)}}
/>`;
};
