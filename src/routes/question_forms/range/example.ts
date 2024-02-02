import type { RangeValue, RangeProperties } from '@surveyplanet/types';

export default (
	id: string,
	min: RangeProperties['min'],
	max: RangeProperties['max'],
	response: RangeValue[]
) => {
	return `
<script lang ='ts'>
	import {Range} from '@surveyplanet/svelte-components';
	import type {RangeValue} from '@surveyplanet/types';

	const responseHandler = (response: RangeValue[]) => {
		console.log(response);
	}
</script>

<Range
	id = '${id}'
	min = ${min}
	max = ${max} 
	onRangeResponse = ${JSON.stringify(response)}
/>`;
};
