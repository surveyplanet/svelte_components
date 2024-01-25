<script lang="ts">
	import type { RatingValue, RatingProperties } from '@surveyplanet/types';
	import RangeSlider from 'svelte-range-slider-pips';
	import { Radio } from '../';

	let {
		id,
		labels = [],
		order = 'default',
		layout = '1',
		response = [],
		ratingResponse,
	} = $props<{
		id: string;
		labels: RatingProperties['labels'];
		order: RatingProperties['order'];
		layout: RatingProperties['layout'];
		response: RatingValue[];
		ratingResponse: (value: RatingValue[]) => void;
	}>();

	// TODO: THIS NEEDS TO BE TESTED
	$effect(() => {
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
	});

	const updateResponse = (value: number) => {
		response = [];
		const result = labels.find(
			(item) => item.value === value
		) as RatingValue;
		response.push(result);
	};

	const inputChangeHandler = (event: Event) => {
		if (layout === 'slider') {
			throw new Error(
				'UNDER CONSTRUCTION: Rating slider layout is not yet implemented.'
			);
		}

		const target = event.target as HTMLInputElement;
		updateResponse(Number(target.value));
		ratingResponse(response);
	};
</script>

<form
	class="sp-survey--question--form--rating sp-survey--question--form--rating--layout-{layout}">
	{#if layout === 'slider'}
		<RangeSlider
			pushy
			float
			{id}
			min={Number(labels[0].value)}
			max={Number(labels[labels.length - 1].value)}
			all="label"
			bind:value={response}
			on:stop={inputChangeHandler} />
	{:else}
		{#each labels as item}
			<div>
				<Radio
					name={id}
					value={item.value.toString()}
					label={item.label}
					size="large"
					onchange={inputChangeHandler} />
			</div>
		{/each}
	{/if}
</form>
