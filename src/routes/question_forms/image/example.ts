import type { ImageProps } from '$lib';

export default (
 data: ImageProps
) => {
	return `
<script lang ="ts">
	import {Image} from '@surveyplanet/svelte-components';
	import type {ImageValue} from '@surveyplanet/types';

	const responseHandler = (response: ImageValue[]) => {
		console.log(response);
	}
</script>
	
<Image
	id='${data.id}'
	labels={${JSON.stringify(data.labels)}}
	multi={${data.multi}}
	size={${data.size}}
	hideCaptions={${data.hideCaptions}}
	contain={${data.contain}}

	random={${data.random}}
	onImageResponse={${JSON.stringify(data.response)}}
/>`;
};
