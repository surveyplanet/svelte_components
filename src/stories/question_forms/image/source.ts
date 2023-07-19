import type { ImageProperties, ImageValue } from '@surveyplanet/types';

export default (
	id: string,
	labels: ImageProperties['labels'],
	multi: ImageProperties['multi'],
	size: ImageProperties['size'],
	hideCaptions: ImageProperties['hideCaptions'],
	contain: ImageProperties['contain'],
	min: ImageProperties['min'],
	max: ImageProperties['max'],
	random: ImageProperties['random'],
	response: ImageValue[]
) => {
	return `<Image
	id={${id}}
	labels={${JSON.stringify(labels)}}
	multi={${multi}}
	size={${size}}
	hideCaptions={${hideCaptions}}
	contain={${contain}}
	min={${min}}
	max={${max}}
	random={${random}}
	response={${JSON.stringify(response)}}
/>`;
};
