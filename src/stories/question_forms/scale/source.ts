import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';

export default (
	id: string,
	min: ScaleProperties['min'],
	max: ScaleProperties['max'],
	response: ScaleValue[]
) => {
	return `<Scale
	id={${id}}
	min={${min}}
	max={${max}}
	response={${JSON.stringify(response)}}
/>`;
};
