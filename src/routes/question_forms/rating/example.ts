import type { RatingValue, RatingProperties } from '@surveyplanet/types';
export default (
	id: string,
	labels: RatingProperties['labels'],
	order: RatingProperties['order'],
	layout: RatingProperties['layout'],
	response: RatingValue[]
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
	id='${id}'
	labels='${JSON.stringify(labels)}'
	order='${order}'
	layout='${layout}'
	onRatingResponse=${JSON.stringify(response)}
/>`;
};
