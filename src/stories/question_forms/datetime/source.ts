import type { DateTimeProperties, DateTimeValue } from '@surveyplanet/types';
import type { DateTimeDefinitions } from '$lib';

export default (
	id: string,
	date: DateTimeProperties['date'],
	time: DateTimeProperties['time'],
	layout: DateTimeProperties['layout'],
	standardizedTime: DateTimeProperties['standardizedTime'],
	definitions: DateTimeDefinitions,
	response: DateTimeValue[]
) => {
	return `<DateTime
	id={${id}}
	date={${date}}
	time={${time}}
	layout="${layout}"
	standardizedTime="${standardizedTime}"
	definitions={${JSON.stringify(definitions)}}
	response={${JSON.stringify(response)}}
/>`;
};
