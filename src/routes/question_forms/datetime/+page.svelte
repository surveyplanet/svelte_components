<script lang="ts">
	import type {
		DateTimeProperties,
		DateTimeValue,
	} from '@surveyplanet/types';

	import {
		ComponentEvent,
		DateTime,
		// type DateTimeDefinitions
	} from '$lib';
	import { Layout, PropsChanger } from '$layout/index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<DateTimeValue[][]>([]);
	// let keys = $state(0);

	let id = $state('abc123');
	// let definitions: DateTimeDefinitions = $state({
	// 	currentTime: 'Set current time',
	// 	currentDate: 'Set current date',
	// 	currentDatetime: 'Set current date and time',
	// });
	let date: DateTimeProperties['date'] = $state(true);
	let time: DateTimeProperties['time'] = $state(true);
	let response: DateTimeValue[] = $state([
		new Date(1977, 3, 29, 12, 0, 0).toISOString(),
	]);

	const dateTimeResponseHandler = (
		event: ComponentEvent<DateTimeValue[]>
	) => {
		events.push(event.value);
	};

	// let responseString = $state(JSON.stringify(response));
	// $effect(() => {
	// 	response = JSON.parse(responseString);
	// });
</script>

<Layout
	component="DateTime"
	example={source({ id, date, time, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<PropsChanger
			label="Date"
			bind:value={date} />
		<PropsChanger
			label="Time"
			bind:value={time} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<DateTime
				{id}
				{date}
				{time}
				{response}
				onDateTimeResponse={dateTimeResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
