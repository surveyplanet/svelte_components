import type { ScaleProps } from '$lib';

export default (
	data: ScaleProps
) => {
	return `
<script lang ='ts'>
	import {Scale} from '@surveyplanet/svelte-components';
	import type {ScaleValue} from '@surveyplanet/types';

	const responseHandler = (response: ScaleValue[]) => {
		console.log(response);
	}
</script>	
	
<Scale
	id='${data.id}'
	min={${data.min}}
	max={${data.max}}
	onScaleResponse={${JSON.stringify(data.response)}}
/>`;
};
