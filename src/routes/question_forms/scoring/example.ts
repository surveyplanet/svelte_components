import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
import type { ScoringDefinitions } from '$lib';

export default (
	id: string,
	definitions: ScoringDefinitions,
	values: ScoringProperties['values'],
	labels: ScoringProperties['labels'],
	maxLabel: ScoringProperties['maxLabel'],
	minLabel: ScoringProperties['minLabel'],
	requireAll: ScoringProperties['requireAll'],
	requireUnique: ScoringProperties['requireUnique'],
	response: ScoringValue[]
) => {
	return `
<script lang ='ts'>
	import {Scoring} from '@surveyplanet/svelte-components';
	import type {ScoringValue} from '@surveyplanet/types';
	const responseHandler = (response: ScoringValue[]) => {
		console.log(response);
	}
</script>
<Scoring
	id='${id}'
	definitions={${JSON.stringify(definitions, null, 2)}}
	values={${JSON.stringify(values, null, 2)}}
	labels={${JSON.stringify(labels, null, 2)}}
	maxLabel='${maxLabel}'
	minLabel='${minLabel}'
	requireAll={${requireAll}}
	requireUnique={${requireUnique}}
	response={${JSON.stringify(response, null, 2)}}
	onScoringResponse={responseHandler}
/>`;
};
