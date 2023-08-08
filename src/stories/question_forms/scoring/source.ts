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
	return `<Scoring
	id={${id}}
	definitions={${JSON.stringify(definitions)}}
	values={${JSON.stringify(values)}}
	labels={${JSON.stringify(labels)}}
	maxLabel={${maxLabel}}
	minLabel={${minLabel}}
	requireAll={${requireAll}}
	requireUnique={${requireUnique}}
	response={${JSON.stringify(response)}}
/>`;
};
