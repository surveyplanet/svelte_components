import type { MultipleChoiceProps } from '$lib';

export default (data: MultipleChoiceProps) => {
	return `
<script lang="ts">
	import {MultipleChoice, ComponentEvent, type MultipleChoiceProps} from '@surveyplanet/svelte-components';
	import type {MultipleChoiceValue} from '@surveyplanet/types';
	
	const onMultipleChoiceResponse = (event: ComponentEvent<MultipleChoiceValue[]>) => {
		console.log(event.value);
	}

	let labels : MultipleChoiceProps['labels'] = ${JSON.stringify(data.labels)};
	let response: MultipleChoiceValue[] = ${JSON.stringify(data.response, null, 2)};

</script>


<MultipleChoice
	id='${data.id}'
	{labels}
	multi={${data.multi}}
	layout='${data.layout}'
	random={${data.random}}
	{response}
	{onMultipleChoiceResponse}
/>`;
};
