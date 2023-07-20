<script lang="ts">
	import type { RangeValue, RangeProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import RangeSlider from 'svelte-range-slider-pips';

	const dispatchResponse = createEventDispatcher<{
		response: RangeValue[];
	}>();

	export let id: string;
	export let min: RangeProperties['min'];
	export let max: RangeProperties['max'];
	export let response: RangeValue[] = [];

	let rangeValues: number[] = [response[0] || min, response[1] || max];

	const rangeSliderStopHandler = () => {
		response = [rangeValues[0], rangeValues[1]];
		dispatchResponse('response', response);
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
</form>
