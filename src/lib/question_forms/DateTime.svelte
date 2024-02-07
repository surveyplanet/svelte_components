<script
	lang="ts"
	context="module">
	import type { Language } from '@surveyplanet/types';

	export interface DateTimeDefinitions {
		currentTime: Language['definitions']['currentTime'];
		currentDate: Language['definitions']['currentDate'];
		currentDatetime: Language['definitions']['currentDatetime'];
	}

	export type DateTimeProps = {
		id: string;
		date?: DateTimeProperties['date'];
		time?: DateTimeProperties['time'];
		response?: DateTimeValue[];
		onDatetimeResponse: (response: DateTimeValue[]) => void;
	};
</script>

<script lang="ts">
	import type {
		DateTimeValue,
		DateTimeProperties,
	} from '@surveyplanet/types';
	import { TextInput, type TextInputType } from '../';
	import { stringToDate } from '@surveyplanet/utilities';
	// import { dateToString } from '@surveyplanet/utilities';

	// const dispatchResponse = createEventDispatcher<{
	// 	response: DateTimeValue[];
	// }>();
	type DateTimeInputType = 'date' | 'time' | 'datetime-local';
	// export let definitions: DateTimeDefinitions;

	let {
		id,
		date = false,
		time = false,
		response = [],
		onDatetimeResponse,
	} = $props<DateTimeProps>();

	let type: DateTimeInputType = $state('date');
	$effect(() => {
		type = (function (d: boolean, t: boolean): DateTimeInputType {
			if (d && t) return 'datetime-local';
			if (t) return 'time';
			return 'date';
		})(date, time);
	});

	let inputType: TextInputType = $state('date');
	$effect(() => {
		inputType = date && time ? 'datetime-local' : time ? 'time' : 'date';
	});

	const updateResponse = (value: Date) => {
		response = [value.toISOString()];
		onDatetimeResponse(response);
	};

	const dateInputChangeHandler = (event: Event) => {
		const { value } = event.target as HTMLInputElement; // "1977-04-12T11:21"
		// let valueString = dateToString(type, [value]);
		// if (!valueString) return;
		//TODO: it seems like it is working as it is, the above conversion using dateToString is messing up with the input value
		const date = stringToDate(type, value);
		if (date) {
			updateResponse(date);
		}
	};
</script>

<form class="sp-survey--question--form sp-survey--question--form--datetime">
	<TextInput
		id="{id}-datetime-input"
		name="date"
		size="large"
		label=""
		bind:type={inputType}
		onInput={dateInputChangeHandler} />
</form>
