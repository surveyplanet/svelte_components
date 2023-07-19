<script
	lang="ts"
	context="module">
	import type { Language } from '@surveyplanet/types';

	export interface DateTimeDefinitions {
		currentTime: Language['definitions']['currentTime'];
		currentDate: Language['definitions']['currentDate'];
		currentDatetime: Language['definitions']['currentDatetime'];
	}

	interface Units {
		hours?: number;
		minutes?: number;
		day?: number;
		month?: number;
		year?: number;
	}
</script>

<script lang="ts">
	import type {
		DateTimeValues,
		DateTimeProperties,
	} from '@surveyplanet/types';
	import { Spinner, TextInput, Checkbox } from '../';
	import { createEventDispatcher } from 'svelte';

	const dispatchResponse = createEventDispatcher<{
		response: DateTimeValues;
	}>();

	export let id: string;
	export let definitions: DateTimeDefinitions;
	export let date: DateTimeProperties['date'] = false;
	export let time: DateTimeProperties['time'] = false;
	export let layout: DateTimeProperties['layout'];
	export let standardizedTime: DateTimeProperties['standardizedTime']; // 24 hour time
	export let response: DateTimeValues = [];

	let units: Units = {};

	$: className = (function (d: boolean, t: boolean): string {
		const name = 'sp-survey--question--datetime';
		if (d && t) return `${name}--date-time`;
		if (d) return `${name}--date`;
		if (t) return `${name}--time`;
		return '';
	})(date, time);

	$: dateInputNames = (function (l: DateTimeProperties['layout']) {
		switch (l) {
			case 'd/m/y':
				return ['day', 'month', 'year'];
			case 'y/m/d':
				return ['year', 'month', 'day'];
			default:
				return ['month', 'day', 'year'];
		}
	})(layout);

	const updateResponse = () => {
		const dateVal = new Date(0, 0, 0);

		if (time) {
			if (units.hours && !isNaN(units.hours)) {
				dateVal.setHours(units.hours + 2);
			}
			if (units.minutes && !isNaN(units.minutes)) {
				dateVal.setMinutes(units.minutes);
			}
		}
		if (date) {
			if (units.day && !isNaN(units.day)) {
				dateVal.setDate(units.day);
			}
			if (units.month && !isNaN(units.month)) {
				dateVal.setMonth(units.month - 1);
			}
			if (units.year && !isNaN(units.year)) {
				dateVal.setFullYear(units.year);
			}
		}

		response = [dateVal.toISOString()];

		dispatchResponse('response', response);
	};

	const getCurrentButtonLabel = () => {
		if (date && time) return definitions.currentDatetime;
		if (date) return definitions.currentDate;
		if (time) return definitions.currentTime;
	};

	const setCurrent = () => {
		const date = new Date();
		units.hours = date.getHours();
		units.minutes = date.getMinutes();
		units.day = date.getDate();
		units.month = date.getMonth() + 1;
		units.year = date.getFullYear();
		updateResponse();
	};

	const spinnerUpdateHandler = () => {
		updateResponse();
	};
</script>

<form class="sp-survey--question--datetime {className}">
	{#if date}
		<!-- This needs to be dynamic so we change the format d/m/y or y/m/d -->
		<!-- {#each dateInputNames as unit}
			{@const max = unit === 'year' ? 9999 : unit === 'month' ? 12 : 31}
			{@const min = unit === 'year' ? 1900 : 1}
			{@const label =
				unit === 'year' ? 'Year' : unit === 'month' ? 'Month' : 'Day'}
			<div class="sp-survey--question--datetime--{unit}">
				<Spinner
					{min}
					{max}
					{label}
					id={`${id}-${unit}`}
					size="large"
					bind:value={units[unit]}
					on:update={spinnerUpdateHandler} />
			</div>
		{/each} -->
		<TextInput
			size="large"
			label="Date"
			type="date" />
	{/if}
	{#if time}
		<div class="sp-survey--question--datetime--hours">
			<Spinner
				max={standardizedTime ? 24 : 12}
				overflow={true}
				label={'Hours'}
				id={`${id}-hours`}
				size="large"
				bind:value={units['hours']}
				on:update={spinnerUpdateHandler} />
		</div>
		<span class="sp-survey--question--datetime--separator">:</span>
		<div class="sp-survey--question--datetime--minutes">
			<Spinner
				max={59}
				overflow={true}
				label={'Minutes'}
				id={`${id}-minutes`}
				size="large"
				bind:value={units['minutes']}
				on:update={spinnerUpdateHandler} />
		</div>
	{/if}

	<Checkbox
		label={getCurrentButtonLabel()}
		name={'set_current'}
		on:change={setCurrent} />
</form>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-survey--question--datetime {
		display: flex; // inline-flex
		flex-direction: row; // row-reverse | column | column-reverse
		flex-wrap: wrap; // wrap | wrap-reverse
		justify-content: flex-start; // flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
		align-items: stretch; // flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
		// align-content: flex-start; // This property only takes effect on multi-line flexible containers, where flex-wrap is set to either wrap or wrap-reverse
	}
	// .sp-survey--question--datetime {
	// 	display: grid;
	// 	gap: $size-gutter--half;
	// 	grid-template-columns: repeat(3, 1fr);
	// 	&.sp-survey--question--datetime--date-time {
	// 		grid-template-columns: repeat(6, 1fr);
	// 	}
	// 	// &.sp-survey--question--datetime--date {
	// 	// 	grid-template-columns: repeat(3, 1fr);
	// 	// }
	// 	// &.sp-survey--question--datetime--time {
	// 	// 	grid-template-columns: repeat(2, 1fr);
	// 	// }
	// }

	.sp-survey--question--datetime--hours {
		// position: relative;
		.sp-survey--question--datetime--separator {
			float: right;
		}
	}
</style>
