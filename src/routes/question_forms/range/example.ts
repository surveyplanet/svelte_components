import type { RangeProps } from '$lib';

export default (
	data: RangeProps
) => {
	return `
<script lang="ts">
	import {Range, ComponentEvent} from '@surveyplanet/svelte-components';
	import type {RangeValue} from '@surveyplanet/types';

	const onRangeResponse = (event: ComponentEvent<RangeValue[]>) => {
		console.log(event.value);
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
