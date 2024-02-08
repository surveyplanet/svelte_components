import type {
	MultipleChoiceValue,
	MultipleChoiceProperties,
} from '@surveyplanet/types';

export default (
	id: string,
	labels: MultipleChoiceProperties['labels'],
	multi: MultipleChoiceProperties['multi'],
	layout: MultipleChoiceProperties['layout'],
	random: MultipleChoiceProperties['random'],
	min: MultipleChoiceProperties['min'],
	max: MultipleChoiceProperties['max'],
	response: MultipleChoiceValue[]
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
	id='${id}'
	labels={${JSON.stringify(labels)}}
	multi={${multi}}
	layout='${layout}'
	random={${random}}
	min={${min ?? ''}}
	max={${max ?? ''}}
	onMultipleChoiceResponse={${JSON.stringify(response)}}
/>`;
};
