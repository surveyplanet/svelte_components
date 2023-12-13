<script lang="ts">
	import type {
		DateTimeProperties,
		DateTimeValue,
	} from '@surveyplanet/types';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { DateTime, type DateTimeDefinitions } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	let id = 'abc123';
	let definitions: DateTimeDefinitions = {
		currentTime: 'Set current time',
		currentDate: 'Set current date',
		currentDatetime: 'Set current date and time',
	};
	let date: DateTimeProperties['date'] = true;
	let time: DateTimeProperties['time'] = true;
	let response: DateTimeValue[] = [
		new Date(1977, 3, 29, 12, 0, 0).toISOString(),
	];

	const dateTimeResponseHandler = (event: CustomEvent) => {
		console.log('DateTime: ', event.detail[0]);
		logEvent(event.type, event.detail);
	};
</script>

<Hst.Story title="Question forms / Datetime">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Checkbox
			bind:value={date}
			title="Date" />
		<Hst.Checkbox
			bind:value={time}
			title="Time" />
		<Hst.Json
			bind:value={definitions}
			title="Language definitions" />
		<Hst.Json
			bind:value={response}
			title="Response" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(id, date, time, definitions, response)}>
		<div class="wrapper">
			<DateTime
				{id}
				{date}
				{time}
				{response}
				on:response={dateTimeResponseHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
