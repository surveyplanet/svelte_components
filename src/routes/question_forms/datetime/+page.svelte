<script lang="ts">
	import type {
		DateTimeProperties,
		DateTimeValue,
	} from '@surveyplanet/types';

	import { DateTime, type DateTimeDefinitions } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<DateTimeValue[][]>([]);
	let keys = $state(0);

	let id = $state('abc123');
	let definitions: DateTimeDefinitions = $state({
		currentTime: 'Set current time',
		currentDate: 'Set current date',
		currentDatetime: 'Set current date and time',
	});
	let date: DateTimeProperties['date'] = $state(true);
	let time: DateTimeProperties['time'] = $state(true);
	let response: DateTimeValue[] = $state([
		new Date(1977, 3, 29, 12, 0, 0).toISOString(),
	]);

	const dateTimeResponseHandler = (datetime: DateTimeValue[]) => {
		events.push(datetime);
	};

	// let responseString = $state(JSON.stringify(response));
	// $effect(() => {
	// 	response = JSON.parse(responseString);
	// });
</script>

<Layout
	component="DateTime"
	example={source(id, date, time, definitions, response)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			text
			bind:value={id} />
		<PropsChanger
			label="Date"
			checkbox
			bind:value={date} />
		<PropsChanger
			label="Time"
			checkbox
			bind:value={time} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<DateTime
				{id}
				{date}
				{time}
				{response}
				onDatetimeResponse={dateTimeResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
