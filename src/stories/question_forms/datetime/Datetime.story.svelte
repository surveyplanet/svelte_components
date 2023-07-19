<script lang="ts">
	import type {
		DateTimeProperties,
		DateTimeValues,
	} from '@surveyplanet/types';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { DateTime, type DateTimeDefinitions } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	let id = '1';
	let definitions: DateTimeDefinitions = {
		currentTime: 'Set current time',
		currentDate: 'Set current date',
		currentDatetime: 'Set current date and time',
	};
	let date: DateTimeProperties['date'] = true;
	let time: DateTimeProperties['time'] = false;
	let layout: DateTimeProperties['layout'] = 'm/d/y';
	let standardizedTime: DateTimeProperties['standardizedTime'] = false;
	let response: DateTimeValues = [];

	const dateTimeResponseHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
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
		<Hst.Checkbox
			bind:value={standardizedTime}
			title="Standardized Time" />
		<Hst.Select
			options={['m/d/y', 'd/m/y', 'y/m/d']}
			bind:value={layout}
			title="Date format" />
		<Hst.Json
			bind:value={definitions}
			title="Language definitions" />
		<Hst.Json
			bind:value={response}
			title="Response" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(
			id,
			date,
			time,
			layout,
			standardizedTime,
			definitions,
			response
		)}>
		<div class="wrapper">
			<DateTime
				{id}
				{date}
				{time}
				{layout}
				{standardizedTime}
				{definitions}
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
