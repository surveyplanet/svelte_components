import type { TabBarData } from '$lib';

export default (data: TabBarData[], grow: boolean, id: string) => {
	return `<script>
	import {type TabBarData, TabBar} from '@surveyplanet/svelte_components';

	let grow = ${grow};
	let id = '${id}';
	let data: TabBarData[] = ${JSON.stringify(data, null, 2)};
</script>

<TabBar {data} {grow} {id}/>

`;
};
