<script lang="ts">
	import type { RangeValue, RangeProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '../TextInput.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import { range } from 'radash';

	const dispatchResponse = createEventDispatcher<{
		response: RangeValue[];
	}>();

	export let id: string;
	export let min: RangeProperties['min'];
	export let max: RangeProperties['max'];
	export let response: RangeValue[] = [];

	let rangeValues = [response[0] || min, response[1] || max];

	const rangeSliderStopHandler = () => {
		response = [rangeValues[0], rangeValues[1]];
		dispatchResponse('response', response);
	};

	//it would be better to do this on a keydown event but we are not dispatching
	//'value' on keydown or input but rather events themselves.
	const minSliderInputHandler = (event: CustomEvent) => {
		let minInputValue = parseInt(event.detail.target.value);
		if (isNaN(minInputValue)) {
			minInputValue = min;
		}
		if (minInputValue >= rangeValues[1]) {
			rangeValues[0] = rangeValues[1] - 1;
			event.detail.target.value = `${rangeValues[1] - 1}`;
		} else if (minInputValue <= min) {
			rangeValues[0] = min;
			event.detail.target.value = `${min}`;
		} else {
			rangeValues[0] = minInputValue;
			event.detail.target.value = `${minInputValue}`;
		}
	};

	const maxSliderInputHandler = (event: CustomEvent) => {
		let maxInputValue = parseInt(event.detail.target.value);

		if (maxInputValue <= rangeValues[0]) {
			rangeValues[1] = rangeValues[0] + 1;
			event.detail.target.value = `${rangeValues[0] + 1}`;
		} else if (maxInputValue >= max) {
			rangeValues[1] = max;
			event.detail.target.value = `${max}`;
		} else {
			rangeValues[1] = maxInputValue;
			event.detail.target.value = `${maxInputValue}`;
		}
	};
</script>

<form class="sp-survey--question--range--form">
	<RangeSlider
		range
		pushy
		float
		{id}
		min={Number(min)}
		max={Number(max)}
		all="label"
		bind:values={rangeValues}
		on:stop={rangeSliderStopHandler} />

	<TextInput
		name="Min"
		id={`${id}-min`}
		value={rangeValues[0].toString()}
		on:change={minSliderInputHandler} />
	<TextInput
		name="Max"
		id={`${id}-max`}
		value={rangeValues[1].toString()}
		on:change={maxSliderInputHandler} />
</form>
