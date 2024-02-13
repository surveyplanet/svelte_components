import type {  DateTimeProps } from '$lib';

export default (
	data: DateTimeProps
) => {
	return `
<script lang ="ts">
	import {DateTime} from '@surveyplanet/svelte-components';
	import type {DateTimeValue} from '@surveyplanet/types';
	const responseHandler = (response: DateTimeValue[]) => {
		console.log(response);
	}
</script>
	
<DateTime
	id='${data.id}'
	date={${data.date}}
	time={${data.time}}
	onDateTimeResponse={${JSON.stringify(data.response)}}
/>`;
};
