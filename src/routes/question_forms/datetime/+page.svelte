<script lang="ts">
	import type {
		DateTimeProperties,
		DateTimeValue,
	} from '@surveyplanet/types';

	import { DateTime, type DateTimeDefinitions } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as DateTimeValue[];
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
		events.push(datetime.toString());
	};
</script>

<Layout
	component="DateTime"
	example={source(id, date, time, definitions, response)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id}
				oninput={(event: Event) => {
					id = (event.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				boolean="Date"
				value={date}
				oninput={(event: Event) => {
					date = (event.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="Time"
				value={time}
				oninput={(event: Event) => {
					time = (event.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				object="Response"
				value={response.toString()} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<DateTime
				{id}
				{date}
				{time}
				{response}
				dateResponse={dateTimeResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
