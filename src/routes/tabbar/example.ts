import type { TabBarProps } from '$lib';

export default (
	data: TabBarProps

) => {
	return `
<script lang="ts">
	import {type TabBarData, TabBar} from '@surveyplanet/svelte_components';
</script>

<TabBar 
	grow='${data.id}' 
	id={${data.block}} 
	data={${JSON.stringify(data.data, null, 2)}}
/>

`;
};
