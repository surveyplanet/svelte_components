import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';

export default (
	id: string,
	min: ScaleProperties['min'],
	max: ScaleProperties['max'],
	response: ScaleValue[]
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
	id = '${id}'
	min = {${min}}
	max = {${max}}
	onScaleResponse = {${JSON.stringify(response)}}
/>`;
};
