<script lang="ts">
	import type { ImageValue, ImageProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import {
		transformImage,
		type TransformOptions,
	} from '@surveyplanet/utilities';

	const dispatchResponse = createEventDispatcher<{
		response: ImageValue[];
	}>();

	export let id: string;
	export let labels: ImageProperties['labels'];
	export let multi: ImageProperties['multi'];
	export let size: ImageProperties['size'] = 'medium';
	export let hideCaptions: ImageProperties['hideCaptions'];
	export let random: ImageProperties['random'];
	// TODO: this property doesn't exist but is should be added in the app.
	// It's not a pretty but will enable the entire image to be visible with cropping.
	export let contain: ImageProperties['contain'] = false;
	export let response: ImageValue[] = [];

	$: if (random) {
		labels = labels.sort(() => Math.random() - 0.5);
	}

	const getImageTransformOptions = (): TransformOptions => {
		// The most common aspect ratio in digital photography is 4:3, this is because
		// it's the aspect ratio of the sensors used in most mobile phone cameras.

		const options: TransformOptions = {
			width: 1000, // height should be 750px
		};

		if (size === 'small') {
			options.width = 300; // height should be 225px
		}

		if (size === 'large') {
			options.width = 2000; // height should be 1500px
		}

		return options;
	};

	const updateResponse = (image: string, remove: boolean) => {
		// find label by image url.
		const label = labels.find((label) => label.image === image);

		if (!label) return; // don't do anything if label is not found. This should never happen.

		const selected = {
			label: label.label,
			value: label.image,
		} as ImageValue;

		// remove value if already exits.
		if (multi) {
			response = response?.filter((val) => val.value !== selected.value);
		} else {
			response = [];
		}

		// just remove the value when the image is unselected.
		if (remove) {
			return;
		}

		response.push(selected);
	};

	const inputChangeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		updateResponse(target.value, !target.checked);
		dispatchResponse('response', response);
	};
</script>

<form
	class="sp-survey--question--form--image sp-survey--question--form--image--{size}"
	class:sp-survey--question--form--image--contain={contain}>
	{#each labels as item, index}
		{@const inputId = `${id}-${index}`}
		{@const img = transformImage(
			item.image,
			getImageTransformOptions(),
			'png'
		)}
		<label class="sp-survey--question--form--image--item for={inputId}">
			<input
				id={inputId}
				name={id}
				value={item.image}
				type={multi ? 'checkbox' : 'radio'}
				on:input={inputChangeHandler} />

			{#if !hideCaptions}
				<span class="sp-survey--question--form--image--item--label">
					{item.label}
				</span>
			{/if}

			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="sp-survey--question--form--image--item--selected-icon">
				<circle
					fill="white"
					cx="10"
					cy="10"
					r="8" />
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.2071 7.70711C15.5976 7.31658 15.5976 6.68342 15.2071 6.29289C14.8166 5.90237 14.1834 5.90237 13.7929 6.29289L8.5 11.5858L6.20711 9.29289C5.81658 8.90237 5.18342 8.90237 4.79289 9.29289C4.40237 9.68342 4.40237 10.3166 4.79289 10.7071L7.79289 13.7071C8.18342 14.0976 8.81658 14.0976 9.20711 13.7071L15.2071 7.70711Z"
					fill="#191F29" />
			</svg>

			<!-- style:background-size={contain ? 'contain' : 'cover'} -->
			<picture
				style:background-image="url({img})"
				role="img"
				title={item.label} />
		</label>
	{/each}
</form>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	$select-animation-speed: 200ms;

	:global(.sp-survey--question--form--image) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $size-gutter;
	}
	:global(
			.sp-survey--question--form--image.sp-survey--question--form--image--small
		) {
		grid-template-columns: repeat(4, 1fr);
	}
	:global(
			.sp-survey--question--form--image.sp-survey--question--form--image--small
				.sp-survey--question--form--image--item
				picture
		) {
		min-width: 150px;
		height: $size-gutter--triple;
	}
	:global(
			.sp-survey--question--form--image.sp-survey--question--form--image--large
		) {
		grid-template-columns: repeat(1, 1fr);
	}
	:global(
			.sp-survey--question--form--image.sp-survey--question--form--image--large
				.sp-survey--question--form--image--item
				picture
		) {
		height: $size-gutter--quadruple * 2;
	}
	:global(
			.sp-survey--question--form--image.sp-survey--question--form--image--contain
				.sp-survey--question--form--image--item
				picture
		) {
		background-size: contain;
	}

	:global(.sp-survey--question--form--image--item) {
		position: relative;
		cursor: pointer;
		display: block;
		font-size: $font-size--16;
	}
	:global(.sp-survey--question--form--image--item input) {
		appearance: none;
	}
	:global(.sp-survey--question--form--image--item input:checked ~ picture) {
		border: 1px solid $color--darkest;
		box-shadow: $shadow--default;
	}
	:global(
			.sp-survey--question--form--image--item
				input:checked
				~ .sp-survey--question--form--image--item--selected-icon
		) {
		visibility: visible;
		opacity: 1;
		bottom: $size-gutter--half;
	}
	:global(.sp-survey--question--form--image--item picture) {
		display: block;
		width: auto;
		margin: 0;
		padding: 0;
		height: $size-gutter--quadruple;
		border-radius: $size-radius--default;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: cover;
		transition: box-shadow $select-animation-speed ease-out;
		border: 1px solid $color--beige-darker;
	}

	:global(.sp-survey--question--form--image--item--label) {
		display: block;
		padding-bottom: $size-gutter--quarter;
	}

	:global(.sp-survey--question--form--image--item--selected-icon) {
		display: block;
		visibility: hidden;
		opacity: 0;
		position: absolute;
		bottom: 0;
		right: $size-gutter--half;
		transition: bottom $select-animation-speed ease-out,
			opacity $select-animation-speed ease-out;
	}
</style>
