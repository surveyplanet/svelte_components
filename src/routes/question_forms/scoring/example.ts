import type { ScoringProps } from '$lib';

export default (
	data: ScoringProps
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
	id='${data.id}'
	definitions={${JSON.stringify(data.definitions, null, 2)}}
	values={${JSON.stringify(data.values, null, 2)}}
	labels={${JSON.stringify(data.maxLabel)}'
	minLabel='${data.minLabel}'
	requireAll={${data.requireAll}}
	requireUnique={${data.requireUnique}}
	response={${JSON.stringify(data.response, null, 2)}}
	onScoringResponse={responseHandler}
/>`;
};
