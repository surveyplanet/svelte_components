<script
	lang="ts"
	context="module">
	export type RatingProps = {
		id: string;
		labels: RatingProperties['labels'];
		order?: RatingProperties['order'];
		layout?: RatingProperties['layout'];
		response?: RatingValue[];
		onRatingResponse?: (value: ComponentEvent<RatingValue[]>) => void;
	};
</script>

<script lang="ts">
	import type { RatingValue, RatingProperties } from '@surveyplanet/types';
	import { RangeSlider } from 'svelte-range-slider-pips';
	import { ComponentEvent, Radio } from '$lib/index';

	let {
		id,
		labels,
		order,
		layout,
		response = [], // forms return empty array if no response
		onRatingResponse,
	} = $props<RatingProps>();

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

	const rangeInputChangeHandler = (event: Event) => {
		if (layout === 'slider') {
			throw new Error(
				'UNDER CONSTRUCTION: Rating slider layout is not yet implemented.'
			);
		}

		const target = event.target as HTMLInputElement;
		updateResponse(Number(target.value));
		if (
			typeof onRatingResponse === 'function' &&
			typeof event.target === 'boolean'
		) {
			const componentEvent = new ComponentEvent(response, target, event);
			onRatingResponse(componentEvent);
		}
	};

	const radioInputChangeHandler = (event: ComponentEvent<boolean>) => {
		updateResponse(Number(event.value));
		if (typeof onRatingResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target,
				event.raw
			);
			onRatingResponse(componentEvent);
		}
	};
</script>

<form
	class="sp-survey--question--form--rating sp-survey--question--form--rating--layout-{layout}">
	{#if layout === 'slider'}
		<RangeSlider
			pushy
			float
			min={Number(labels[0].value)}
			max={Number(labels[labels.length - 1].value)}
			all="label"
			bind:value={response}
			on:stop={rangeInputChangeHandler} />
	{:else}
		{#each labels as item}
			<div>
				<Radio
					name={id}
					value={item.value.toString()}
					label={item.label}
					size="large"
					onRadioChange={radioInputChangeHandler} />
			</div>
		{/each}
	{/if}
</form>
