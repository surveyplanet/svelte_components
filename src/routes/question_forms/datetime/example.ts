import type { DateTimeProperties, DateTimeValue } from '@surveyplanet/types';
import type { DateTimeDefinitions } from '$lib';

export default (
	id: string,
	date: DateTimeProperties['date'],
	time: DateTimeProperties['time'],

	definitions: DateTimeDefinitions,
	response: DateTimeValue[]
) => {
	return `
<script lang ='ts'>
	import {DateTime} from '@surveyplanet/svelte-components';
	import type {DateTimeValue} from '@surveyplanet/types';

	const responseHandler = (response: DateTimeValue[]) => {
		console.log(response);
	}
</script>
	
<DateTime
	id= '${id}'
	date= {${date}}
	time= {${time}}
	definitions= {${JSON.stringify(definitions)}}
	onDateTimeResponse= {${JSON.stringify(response)}}
/>`;
};
