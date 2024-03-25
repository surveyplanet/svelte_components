import type { RatingProps } from '$lib';

export default (data: RatingProps) => {
	return `
<script lang="ts">
	import {Rating, ComponentEvent, type RatingProps} from '@surveyplanet/svelte-components';
	import type {RatingValue} from '@surveyplanet/types';
	const onRatingResponse = (event: ComponentEvent<RatingValue[]>) => {
		console.log(event.value);
	}
	let labels : RatingProps['labels'] = ${JSON.stringify(data.labels)};
	let response: RatingValue[] = ${JSON.stringify(data.response, null, 2)};
</script>

<Rating
	id='${data.id}'
	{labels}
	order='${data.order}'
	layout='${data.layout}'
	{response}
	{onRatingResponse}
/>`;
};
