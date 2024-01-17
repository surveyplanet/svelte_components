<script lang="ts">
	import type {
		DateTimeProperties,
		DateTimeValue,
	} from '@surveyplanet/types';

	import { DateTime, type DateTimeDefinitions } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
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

	const dateTimeResponseHandler = (event: CustomEvent) => {
		console.log('DateTime: ', event.detail[0]);
		events.push('response');
	};
</script>

<Layout
	component="DateTime"
	example={source(id, date, time, definitions, response)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id} />
			<PropsChanger
				text="Date"
				value={date} />
			<PropsChanger
				text="Time"
				value={time} />
			<PropsChanger
				object="Response"
				value={response.toString()} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<DateTime
				{id}
				{date}
				{time}
				{response}
				on:response={dateTimeResponseHandler} />
		</div>
	</svelte:fragment>
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
