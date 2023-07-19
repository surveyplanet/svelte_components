import type { RatingValue, RatingProperties } from '@surveyplanet/types';
export default (
	id: string,
	labels: RatingProperties['labels'],
	order: RatingProperties['order'],
	layout: RatingProperties['layout'],
	response: RatingValue[]
) => {
	return `<Rating
	id={${id}}
	labels={${JSON.stringify(labels)}}
	order={${order}}
	layout={${layout}}
	response={${JSON.stringify(response)}}
/>`;
};
