import type { RatingProps } from '$lib';

export default (
	data: RatingProps
) => {
	return `
<script lang ='ts'>
	import {Rating} from '@surveyplanet/svelte-components';
	import type {RatingValue} from '@surveyplanet/types';
	const responseHandler = (response: RatingValue[]) => {
		console.log(response);
	}
</script>

<Rating
	id='${data.id}'
	labels={${JSON.stringify(data.labels)}}
	order='${data.order}'
	layout='${data.layout}'
	onRatingResponse={${JSON.stringify(data.response)}}
/>`;
};
