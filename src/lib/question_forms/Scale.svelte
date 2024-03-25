<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type ScaleProps = HTMLAttributes<HTMLFormElement> & {
		min: ScaleProperties['min'];
		max: ScaleProperties['max'];
		response?: ScaleValue[];
		onScaleResponse?: (event: ComponentEvent<ScaleValue[], null>) => void;
	};
</script>

<script lang="ts">
	import { ComponentEvent } from '../';
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import { RangeSlider } from 'svelte-range-slider-pips';

	let {
		min,
		max,
		response = [], // forms return empty array if no response
		onScaleResponse,
		...attr
	}: ScaleProps = $props();

	let rangeValues: number[] = $state([response[0]] || [min]);

	const sliderStopHandler = (event: Event) => {
		response = [rangeValues[0]];
		if (typeof onScaleResponse === 'function') {
			const componentEvent = new ComponentEvent(response, null, event);
			onScaleResponse(componentEvent);
		}
	};
</script>

<form
	{...attr}
	class="sp-survey--question--form--scale">
	<RangeSlider
		pushy
		float
		value={0}
		min={Number(min)}
		max={Number(max)}
		all="label"
		bind:values={rangeValues}
		on:stop={sliderStopHandler} />
</form>
