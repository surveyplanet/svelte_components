<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import RangeSlider from 'svelte-range-slider-pips';

	const dispatchResponse = createEventDispatcher<{
		response: ScaleValue[];
	}>();

	export let id: string;
	export let min: ScaleProperties['min'];
	export let max: ScaleProperties['max'];
	export let response: ScaleValue[] = [];

	let rangeValues: number[] = [response[0] || min];

	const sliderStopHandler = () => {
		response = [rangeValues[0]];
		dispatchResponse('response', response);
	};
</script>

<form class="sp-survey--question--scale--form">
	{#if max - min < 12}
		<!--
		{#if layout === 'star'}
		{:else if layout === 'heart'}
		{:else if layout === 'smiley'}
		{:else if layout === 'thumbs'}
		{:else}
			# Likert scale (use Radio component)
		{#if}
		-->
	{:else}
		<RangeSlider
			range
			pushy
			float
			{id}
			min={Number(min)}
			max={Number(max)}
			all="label"
			bind:values={rangeValues}
			on:stop={sliderStopHandler} />
		<!-- needs min/max inputs -->
	{/if}
</form>
