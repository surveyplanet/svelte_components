import type { RangeProps } from '$lib';

export default (
	data: RangeProps
) => {
	return `
<script lang="ts">
	import {Range} from '@surveyplanet/svelte-components';
	import type {RangeValue} from '@surveyplanet/types';

	const onRangeResponse = (response: RangeValue[]) => {
		console.log(response);
	}

	let response: RangeValue[] = ${JSON.stringify(data.response, null, 2)};
</script>

<Range
	id='${data.id}'
	min={${data.min}}
	max={${data.max}}
	{response}
	{onRangeResponse}
/>`;
};
