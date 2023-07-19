import type { EssayProperties, EssayValue } from '@surveyplanet/types';

export default (
	id: string,
	min: EssayProperties['min'],
	max: EssayProperties['max'],
	response: EssayValue[]
) => {
	return `<Essay
	id={${id}}
	min={${min}}
	max={${max}}
	response={${JSON.stringify(response)}}
/>`;
};
