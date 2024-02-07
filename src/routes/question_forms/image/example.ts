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
	return `
<script lang ='ts'>
	import {Image} from '@surveyplanet/svelte-components';
	import type {ImageValue} from '@surveyplanet/types';

	const responseHandler = (response: ImageValue[]) => {
		console.log(response);
	}
</script>
	
<Image
	id ='${id}'
	labels ={${JSON.stringify(labels)}}
	multi = {${multi}}
	size = {${size}}
	hideCaptions = {${hideCaptions}}
	contain = {${contain}}
	min = {${min}}
	max = {${max}}
	random = {${random}}
	onImageResponse = {${JSON.stringify(response)}}
/>`;
};
