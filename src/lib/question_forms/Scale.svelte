<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import RangeSlider from 'svelte-range-slider-pips';

	let {
		id,
		min,
		max,
		response = [],
		scaleResponse,
	} = $props<{
		id: string;
		min: ScaleProperties['min'];
		max: ScaleProperties['max'];
		response: ScaleValue[];
		scaleResponse: (value: ScaleValue[]) => void;
	}>();

	let rangeValues: number[] = $state([response[0]] || [min]);

	const sliderStopHandler = () => {
		response = [rangeValues[0]];
		scaleResponse(response);
	};
</script>

<form class="sp-survey--question--form--scale">
	<RangeSlider
		pushy
		float
		min={Number(min)}
		max={Number(max)}
		all="label"
		bind:values={rangeValues}
		on:stop={sliderStopHandler} />
</form>
