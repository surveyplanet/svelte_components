<script
	lang="ts"
	context="module">
	export type RangeProps = {
		id: string;
		min: number;
		max: number;
		response?: RangeValue[];
		onRangeResponse?: (value: RangeValue[]) => void;
	};
</script>

<script lang="ts">
	import type { RangeValue } from '@surveyplanet/types';
	import TextInput from '../TextInput.svelte';
	import RangeSlider from 'svelte-range-slider-pips';

	let { id, min, max, response = [], onRangeResponse } = $props<RangeProps>();

	let rangeValues = $state([response[0] || min, response[1] || max]);
	// onMount(() => {
	// 	rangeValues = [response[0] || min, response[1] || max];
	// });

	const rangeSliderStopHandler = () => {
		response = [rangeValues[0], rangeValues[1]];
		if (onRangeResponse) onRangeResponse(response);
	};

	// it would be better to do this on a keydown event but we are not dispatching
	// 'value' on keydown or input but rather events themselves.
	const minSliderInputHandler = (event: Event) => {
		let minInputValue = parseInt((event.target as HTMLInputElement).value);
		if (isNaN(minInputValue)) {
			minInputValue = min;
		}
		if (minInputValue >= rangeValues[1]) {
			rangeValues[0] = rangeValues[1] - 1;
			(event.target as HTMLInputElement).value = `${rangeValues[1] - 1}`;
		} else if (minInputValue <= min) {
			rangeValues[0] = min;
			(event.target as HTMLInputElement).value = `${min}`;
		} else {
			rangeValues[0] = minInputValue;
			(event.target as HTMLInputElement).value = `${minInputValue}`;
		}
	};

	const maxSliderInputHandler = (event: Event) => {
		let maxInputValue = parseInt((event.target as HTMLInputElement).value);

		if (maxInputValue <= rangeValues[0]) {
			rangeValues[1] = rangeValues[0] + 1;
			(event.target as HTMLInputElement).value = `${rangeValues[0] + 1}`;
		} else if (maxInputValue >= max) {
			rangeValues[1] = max;
			(event.target as HTMLInputElement).value = `${max}`;
		} else {
			rangeValues[1] = maxInputValue;
			(event.target as HTMLInputElement).value = `${maxInputValue}`;
		}
	};
</script>

<form class="sp-survey--question--form--range">
	<RangeSlider
		range
		pushy
		float
		min={Number(min)}
		max={Number(max)}
		all="label"
		bind:values={rangeValues}
		on:stop={rangeSliderStopHandler} />

	<TextInput
		name="Min"
		id={`${id}-min`}
		value={rangeValues[0].toString()}
		onkeydown={minSliderInputHandler} />
	<TextInput
		name="Max"
		id={`${id}-max`}
		value={rangeValues[1].toString()}
		onkeydown={maxSliderInputHandler} />
</form>
