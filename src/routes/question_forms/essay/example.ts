import type { EssayProperties, EssayValue } from '@surveyplanet/types';

export default (
	id: string,
	min: EssayProperties['min'],
	max: EssayProperties['max'],
	single: EssayProperties['single'],
	response: EssayValue[]
) => {
	return `<Essay
	id={${id}}
	min={${min}}
	max={${max}}
	single={${single}}
	response={${JSON.stringify(response)}}
/>`;
};
