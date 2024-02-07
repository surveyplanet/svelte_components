import type { TabBarData } from '$lib';

export default (data: TabBarData[], grow: boolean, id: string) => {
	return `
<script>

	import {type TabBarData, TabBar} from '@surveyplanet/svelte_components';

</script>

<TabBar 
	grow = '${id}' 
	id = {${grow}} 
	data = {${JSON.stringify(data, null, 2)}}
/>

`;
};
