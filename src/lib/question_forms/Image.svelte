<script
	lang="ts"
	context="module">
	export type ImageProps = {
		id: string;
		labels: ImageProperties['labels'];
		multi: ImageProperties['multi'];
		size: ImageProperties['size'];
		hideCaptions?: ImageProperties['hideCaptions'];
		random?: ImageProperties['random'];
		contain?: ImageProperties['contain'];
		response?: ImageValue[];
		imageResponse: (value: ImageValue[]) => void;
	};
</script>

<script lang="ts">
	import type { ImageValue, ImageProperties } from '@surveyplanet/types';
	import {
		transformImage,
		type TransformOptions,
	} from '@surveyplanet/utilities';

	// TODO: this property doesn't exist but is should be added in the app.
	// It's not a pretty but will enable the entire image to be visible with cropping.
	// export let contain: ImageProperties['contain'] = false;

	let {
		id,
		labels,
		multi,
		size,
		hideCaptions,
		random,
		contain = false,
		response = [],
		imageResponse,
	} = $props<ImageProps>();
	//nopt working
	$effect(() => {
		if (random) {
			labels = labels.sort(() => Math.random() - 0.5);
		}
	});

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

		const selected: ImageValue = {
			label: label.label,
			value: label.image,
		};

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
		imageResponse(response);
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
				oninput={inputChangeHandler} />

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
