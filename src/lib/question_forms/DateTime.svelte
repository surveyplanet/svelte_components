<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Language } from '@surveyplanet/types';

	export interface DateTimeDefinitions {
		currentTime: Language['definitions']['currentTime'];
		currentDate: Language['definitions']['currentDate'];
		currentDatetime: Language['definitions']['currentDatetime'];
	}

	export type DateTimeProps = HTMLAttributes<HTMLFormElement> & {
		id?: string;
		date?: DateTimeProperties['date'];
		time?: DateTimeProperties['time'];
		response?: DateTimeValue[];
		onDateTimeResponse?: (
			event: ComponentEvent<DateTimeValue[], HTMLInputElement>
		) => void;
	};
</script>

<script lang="ts">
	import type {
		DateTimeValue,
		DateTimeProperties,
	} from '@surveyplanet/types';
	import { ComponentEvent, TextInput, type TextInputType } from '../';
	import { stringToDate } from '@surveyplanet/utilities';
	// import { dateToString } from '@surveyplanet/utilities';

	// const dispatchResponse = createEventDispatcher<{
	// 	response: DateTimeValue[];
	// }>();
	type DateTimeInputType = 'date' | 'time' | 'datetime-local';
	// export let definitions: DateTimeDefinitions;

	let {
		date,
		time,
		response = [], // forms return empty array if no response
		onDateTimeResponse,
		...attr
	}: DateTimeProps = $props();

	let type: DateTimeInputType = $state('date');
	$effect(() => {
		type = (function (
			d: boolean | undefined,
			t: boolean | undefined
		): DateTimeInputType {
			if (d && t) return 'datetime-local';
			if (t) return 'time';
			return 'date';
		})(date, time);
	});

	let inputType: TextInputType = $state('date');
	$effect(() => {
		inputType = date && time ? 'datetime-local' : time ? 'time' : 'date';
	});

	const updateResponse = (
		value: Date,
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		response = [value.toISOString()];
		if (typeof onDateTimeResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target,
				event.raw
			);
			onDateTimeResponse(componentEvent);
		}
	};

	const dateInputChangeHandler = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		const { value } = event.target as HTMLInputElement; // "1977-04-12T11:21"
		// let valueString = dateToString(type, [value]);
		// if (!valueString) return;
		//TODO: it seems like it is working as it is, the above conversion using dateToString is messing up with the input value
		const date = stringToDate(type, value);
		if (date) {
			updateResponse(date, event);
		}
	};
</script>

<form
	{...attr}
	class="sp-survey--question--form sp-survey--question--form--datetime">
	<TextInput
		name="date"
		size="large"
		label=""
		bind:type={inputType}
		onTextInputInput={dateInputChangeHandler} />
</form>
