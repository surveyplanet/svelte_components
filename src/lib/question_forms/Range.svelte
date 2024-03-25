<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type RangeProps = HTMLAttributes<HTMLFormElement> & {
		min: number;
		max: number;
		response?: RangeValue[];
		onRangeResponse?: (event: ComponentEvent<RangeValue[], null>) => void;
	};
</script>

<script lang="ts">
	import type { RangeValue } from '@surveyplanet/types';
	import { RangeSlider } from 'svelte-range-slider-pips';
	import { TextInput, ComponentEvent } from '../';

	let {
		min,
		max,
		response = [], // forms return empty array if no response
		onRangeResponse,
		...attr
	}: RangeProps = $props();

	let rangeValues = $state([response[0] || min, response[1] || max]);
	// onMount(() => {
	// 	rangeValues = [response[0] || min, response[1] || max];
	// });

	const rangeSliderStopHandler = (event: Event) => {
		response = [rangeValues[0], rangeValues[1]];
		if (typeof onRangeResponse === 'function') {
			const componentEvent = new ComponentEvent(response, null, event);
			onRangeResponse(componentEvent);
		}
	};

	// it would be better to do this on a keydown event but we are not dispatching
	// 'value' on keydown or input but rather events themselves.
	const minSliderInputHandler = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
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

	const maxSliderInputHandler = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
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

<form
	{...attr}
	class="sp-survey--question--form--range">
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
		value={rangeValues[0].toString()}
		onTextInputKeydown={minSliderInputHandler} />
	<TextInput
		name="Max"
		value={rangeValues[1].toString()}
		onTextInputKeydown={maxSliderInputHandler} />
</form>
