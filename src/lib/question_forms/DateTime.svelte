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
		DateTimeValue,
		DateTimeProperties,
	} from '@surveyplanet/types';
	import { TextInput, type TextInputType } from '../';
	import { createEventDispatcher } from 'svelte';
	import { stringToDate } from '@surveyplanet/utilities';
	import { dateToString } from '@surveyplanet/utilities';

	const dispatchResponse = createEventDispatcher<{
		response: DateTimeValue[];
	}>();
	type DateTimeInputType = 'date' | 'time' | 'datetime-local';
	export let id: string;
	// export let definitions: DateTimeDefinitions;
	export let date: DateTimeProperties['date'] = false;
	export let time: DateTimeProperties['time'] = false;
	export let response: DateTimeValue[] = [];

	$: type = (function (d: boolean, t: boolean): DateTimeInputType {
		if (d && t) return 'datetime-local';
		if (t) return 'time';
		return 'date';
	})(date, time);

	let inputType: TextInputType = 'date';
	$: inputType = date && time ? 'datetime-local' : time ? 'time' : 'date';

	// $: currentButtonLabel = (function (d: boolean, t: boolean): string {
	// 	if (d && t) return definitions.currentDatetime;
	// 	if (t) return definitions.currentTime;
	// 	return definitions.currentDate;
	// })(date, time);

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

	// const stringToDate = (isoStr: string): Date | undefined => {
	// 	// console.log('stringToDate', isoStr);

	// 	if (!isoStr?.length) {
	// 		return;
	// 	}

	// 	isoStr = isoStr.trim(); // clean up whitespace

	// 	let result: Date;

	// 	// Time format only e.g.: 11:35
	// 	if (!date) {
	// 		const [hr, min] = isoStr.split(':').map(Number);

	// 		if (isNaN(hr) || isNaN(min)) {
	// 			return;
	// 		}
	// 		// BUG: this will be in the user's timezone instead of UTC, need to
	// 		// use Intl API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
	// 		result = new Date(0, 0, 0);
	// 		result.setUTCHours(hr);
	// 		result.setUTCMinutes(min);
	// 	} else {
	// 		// This should work for both date and datetime formats e.g.: 1977-04-29 or 1977-03-29T06:00:00
	// 		if (!time) {
	// 			result = new Date(isoStr); // BUG: same bug as above.
	// 		} else {
	// 			const [d, t] = isoStr.split('T');
	// 			const [hr, min] = t.split(':').map(Number);
	// 			result = new Date(d);
	// 			result.setUTCHours(hr);
	// 			result.setUTCMinutes(min);
	// 		}
	// 	}

	// 	if (isNaN(result.getTime())) {
	// 		return;
	// 	}

	// 	return result;
	// };

	//

	// const dateToString = (
	// 	type: DateTimeInputType,
	// 	response: DateTimeValue[]
	// ): string | '' => {
	// 	if (!response.length) {
	// 		return '';
	// 	}

	// 	const dateVal = new Date(response[0]);

	// 	if (isNaN(dateVal.getTime())) {
	// 		return '';
	// 	} else if (type === 'datetime-local') {
	// 		return dateVal.toISOString().split('.')[0]; // datetime-local
	// 	} else if (type === 'time') {
	// 		return dateVal.toISOString().split('T')[1].split('.')[0]; // time only
	// 	} else {
	// 		return dateVal.toISOString().split('T')[0]; // date only
	// 	}
	// };

	const dateInputChangeHandler = ({ detail }: CustomEvent['detail']) => {
		const { value } = detail.target; // "1977-04-12T11:21"
		const date = stringToDate(type, value);
		if (date) {
			updateResponse(date);
		}
	};

	const handle = (): string | undefined => {
		console.log('handle', response, type);
		return dateToString(type, response);
	};
</script>

<form class="sp-survey--question--form sp-survey--question--form--datetime">
	<TextInput
		id="{id}-datetime-input"
		name="date"
		size="large"
		label=""
		type={inputType}
		on:input={dateInputChangeHandler}
		value={handle()} />
</form>
