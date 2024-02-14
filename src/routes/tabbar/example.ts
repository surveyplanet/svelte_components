import type { TabBarProps } from '$lib';

export default (
	data: TabBarProps

) => {
	return `
<script lang="ts">
	import {type TabBarData, TabBar} from '@surveyplanet/svelte_components';
	const onTabClick = (id: string): void => {
		console.log(id);
	};
	let data: TabBarData[] = ${JSON.stringify(data.data, null, 2)};
</script>

<TabBar 
	block={${data.block}} 
	id='${data.id}' 
	{data}
	{onTabClick}
/>

`;
};
