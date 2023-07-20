<script
	lang="ts"
	context="module">
	import type { Language } from '@surveyplanet/types';

	export interface DateTimeDefinitions {
		currentTime: Language['definitions']['currentTime'];
		currentDate: Language['definitions']['currentDate'];
		currentDatetime: Language['definitions']['currentDatetime'];
	}
</script>

<script lang="ts">
	import type {
		DateTimeValues,
		DateTimeProperties,
	} from '@surveyplanet/types';
	import { TextInput, type TextInputType } from '../';
	import { createEventDispatcher } from 'svelte';

	const dispatchResponse = createEventDispatcher<{
		response: DateTimeValues;
	}>();

	export let id: string;
	export let definitions: DateTimeDefinitions;
	export let date: DateTimeProperties['date'] = false;
	export let time: DateTimeProperties['time'] = false;
	export let response: DateTimeValues = [];

	let inputType: TextInputType = 'date';
	$: inputType = date && time ? 'datetime-local' : time ? 'time' : 'date';
	$: inputValue = dateToString();

	$: currentButtonLabel = (function (d: boolean, t: boolean): string {
		if (d && t) return definitions.currentDatetime;
		if (t) return definitions.currentTime;
		return definitions.currentDate;
	})(date, time);

	// $: className = (function (d: boolean, t: boolean): string {
	// 	const name = 'sp-survey--question--datetime';
	// 	if (d && t) return `${name}--date-time`;
	// 	if (d) return `${name}--date`;
	// 	if (t) return `${name}--time`;
	// 	return '';
	// })(date, time);

	const updateResponse = (value: Date) => {
		response = [value.toISOString()];
		dispatchResponse('response', response);
	};

	const stringToDate = (isoStr: string): Date | undefined => {
		console.log('stringToDate', isoStr);

		if (!isoStr?.length) {
			return;
		}

		isoStr = isoStr.trim(); // clean up whitespace

		let result: Date;

		// Time format only e.g.: 11:35
		if (!date) {
			const [hr, min] = isoStr.split(':').map(Number);

			if (isNaN(hr) || isNaN(min)) {
				return;
			}

			// BUG: this will be in the user's timezone instead of UTC, need to
			// use Intl API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
			result = new Date(0, 0, 0, hr, min, 0);
		} else {
			// This should work for both date and datetime formats e.g.: 1977-04-29 or 1977-03-29T06:00:00
			result = new Date(isoStr); // BUG: same bug as above.
		}

		if (isNaN(result.getTime())) {
			return;
		}

		return result;
	};

	const dateToString = () => {
		if (!response?.length) {
			return '';
		}

		const dateVal = new Date(response[0]);

		if (isNaN(dateVal.getTime())) {
			return '';
		}

		if (date && time) {
			return dateVal.toISOString().split('.')[0]; // datetime-local
		}

		if (time) {
			return dateVal.toISOString().split('T')[1].split('.')[0]; // time only
		}

		if (date) {
			return dateVal.toISOString().split('T')[0]; // date only
		}

		return '';
	};

	const dateInputChangeHandler = ({ detail }: CustomEvent['detail']) => {
		const { value } = detail.target;
		const date = stringToDate(value);
		if (date) {
			updateResponse(date);
		}
	};
</script>

<form class="sp-survey--question--datetime">
	<TextInput
		id="{id}-date"
		name="date"
		size="large"
		label=""
		type={inputType}
		on:input={dateInputChangeHandler}
		value={inputValue} />
	<!-- on:change={dateInputChangeHandler} -->
</form>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
