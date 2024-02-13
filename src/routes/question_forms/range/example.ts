import type { RangeProps } from '$lib';

export default (
	data: RangeProps
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
	id='${data.id}'
	min={${data.min}}
	max={${data.max}}
	onRangeResponse={${JSON.stringify(data.response)}}
/>`;
};
