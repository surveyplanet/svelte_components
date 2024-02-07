<script
	lang="ts"
	context="module">
	export type ScaleProps = {
		id: string;
		min: ScaleProperties['min'];
		max: ScaleProperties['max'];
		response?: ScaleValue[];
		onScaleResponse: (response: ScaleValue[]) => void;
	};
</script>

<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import { RangeSlider } from 'svelte-range-slider-pips';

	let { id, min, max, response = [], onScaleResponse } = $props<ScaleProps>();

	let rangeValues: number[] = $state([response[0]] || [min]);

	const sliderStopHandler = () => {
		response = [rangeValues[0]];
		onScaleResponse(response);
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
