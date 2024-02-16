import type { TabBarProps } from '$lib';

export default (data: TabBarProps) => {
	return `
<script lang="ts">
	import {type TabBarData, TabBar, ComponentEvent} from '@surveyplanet/svelte_components';
	const onTabClick = (event: ComponentEvent<string>): void => {
		console.log(event.value);
	};
	let data: TabBarData[] = ${JSON.stringify(data.data, null, 2)};
</script>

<TabBar 
	block='${data.block}' 
	block='${data.plain}' 
	defaultIndicatorWidth={${data.defaultIndicatorWidth}}
	defaultIndicatorX={${data.defaultIndicatorX}}
	{data}
	{onTabClick}
/>

`;
};
