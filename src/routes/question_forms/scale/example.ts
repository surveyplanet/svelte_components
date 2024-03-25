import type { ScaleProps } from '$lib';

export default (data: ScaleProps) => {
	return `
<script lang="ts">
	import {Scale} from '@surveyplanet/svelte-components';
	import type {ScaleValue} from '@surveyplanet/types';

	const onScaleResponse = (event: ComponentEvent<ScaleValue[]>) => {
		console.log(event.value);
	}
	let response: ScaleValue[] = ${JSON.stringify(data.response, null, 2)};
</script>	
	
<Scale
	id='${data.id}'
	min={${data.min}}
	max={${data.max}}
	{response}
	{onScaleResponse}
/>`;
};
