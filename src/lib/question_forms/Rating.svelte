<script lang="ts">
	import type { RatingValue, RatingProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import { Radio } from '../';

	const dispatchResponse = createEventDispatcher<{ input: RatingValue[] }>();

	export let id: string;
	export let labels: RatingProperties['labels'] = [];
	export let order: RatingProperties['order'] = 'default';
	export let layout: RatingProperties['layout'] = '1';
	export let response: RatingValue[] = [];

	// TODO: THIS NEEDS TO BE TESTED
	if (order === 'random') {
		labels = labels.sort(() => Math.random() - 0.5);
	} else if (order === 'asc_title') {
		labels = labels.sort((a, b) =>
			'label' in a ? -1 : 'label' in b ? 1 : 0
		);
	} else if (order === 'desc_title') {
		labels = labels.sort((a, b) =>
			'label' in a ? 1 : 'label' in b ? -1 : 0
		);
	} else if (order === 'asc_value') {
		labels = labels.sort((item) => Number(item.value));
	} else if (order === 'desc_value') {
		labels = labels.sort((item) => -Number(item.value));
	}

	const updateResponse = (value: number) => {
		response = [];
		const result = labels.find(
			(item) => item.value === value
		) as RatingValue;
		response.push(result);
	};

	const inputChangeHandler = (event: CustomEvent) => {
		const target = event.detail.target as HTMLInputElement;
		updateResponse(Number(target.value));
		dispatchResponse('input', response);
	};
</script>

<form
	class="sp-survey--question--rating--form sp-survey--question--rating--layout-{layout}">
	{#if layout === 'slider'}
		<RangeSlider />
		<!--
		{:else if layout === 'star'}
		{:else if layout === 'heart'}
		{:else if layout === 'smiley'}
		{:else if layout === 'thumbs'}
		-->
	{:else}
		{#each labels as item}
			<div>
				<Radio
					name={id}
					value={item.value.toString()}
					label={item.label}
					size="large"
					on:change={inputChangeHandler} />
			</div>
		{/each}
	{/if}
</form>
