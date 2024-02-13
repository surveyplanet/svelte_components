import type { ScoringProps } from '$lib';

export default (
	data: ScoringProps
) => {
	return `
<script lang ="ts">
	import {Scoring} from '@surveyplanet/svelte-components';
	import type {ScoringValue} from '@surveyplanet/types';
	const responseHandler = (response: ScoringValue[]) => {
		console.log(response);
	}
	let labels : ScoringProps['labels'] = ${JSON.stringify(data.labels)};
	let values: ScoringProps['values'] = ${JSON.stringify(data.values, null, 2)};
	let definitions: ScoringProps['definitions'] = ${JSON.stringify(data.definitions, null, 2)};
	let response: ScoringValue[] = ${JSON.stringify(data.response, null, 2)};
</script>
<Scoring
	id='${data.id}'
	{definitions}
	{values}
	{labels}
	minLabel='${data.minLabel}'
	requireAll={${data.requireAll}}
	requireUnique={${data.requireUnique}}
	{response}
	{onScoringResponse}
/>`;
};
