import type { MultipleChoiceProps } from '$lib';

export default (
	data: MultipleChoiceProps
) => {
	return `
<script lang ='ts'>
	import {MultipleChoice} from '@surveyplanet/svelte-components';
	import type {MultipleChoiceValue} from '@surveyplanet/types';
	
	const responseHandler = (response: MultipleChoiceValue[]) => {
		console.log(response);
	}
</script>


<MultipleChoice
	id='${data.id}'
	labels={${JSON.stringify(data.labels)}}
	multi={${data.multi}}
	layout='${data.layout}'
	random={${data.random}}
	onMultipleChoiceResponse={${JSON.stringify(data.response)}}
/>`;
};
