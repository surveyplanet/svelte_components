import type { ImageProps } from '$lib';

export default (data: ImageProps) => {
	return `
<script lang="ts">
	import {Image, ComponentEvent, type ImageProps} from '@surveyplanet/svelte-components';
	import type {ImageValue} from '@surveyplanet/types';

	const onImageResponse = (event: ComponentEvent<ImageValue[]>) => {
		console.log(event.value);
	}
	let labels : ImageProps['labels'] = ${JSON.stringify(data.labels)};
	let response: ImageValue[] = ${JSON.stringify(data.response, null, 2)};

</script>
	
<Image
	id='${data.id}'
	{labels}
	multi={${data.multi}}
	size='${data.size}'
	hideCaptions={${data.hideCaptions}}
	contain={${data.contain}}
	random={${data.random}}
	{response}
	{onImageResponse}
/>`;
};
