import type {  DateTimeProps } from '$lib';

export default (
	data: DateTimeProps
) => {
	return `
<script lang="ts">
	import {DateTime, ComponentEvent} from '@surveyplanet/svelte-components';
	import type {DateTimeValue} from '@surveyplanet/types';
	const onDateTimeResponse = (event: ComponentEvent<DateTimeValue[]>) => {
		console.log(event.value);
	}
	let response: DateTimeValue[] = ${JSON.stringify(data.response, null, 2)};
</script>
	
<DateTime
	id='${data.id}'
	date={${data.date}}
	time={${data.time}}
	{response}
	{onDateTimeResponse}
/>`;
};
