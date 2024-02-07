<script lang="ts">
	import type { ImageProperties, ImageValue } from '@surveyplanet/types';
	import { Image } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ImageValue[][]>([]);
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: ImageProperties['labels'] = $state([
		{
			image: 'https://media.surveyplanet.com/testing/default',
			label: 'Image 1',
		},
		{
			image: 'https://media.surveyplanet.com/testing/no-extension-jpg',
			label: 'Image 2',
		},
	]);
	let multi: ImageProperties['multi'] = $state(false);
	let size: ImageProperties['size'] = $state('medium');
	let hideCaptions: ImageProperties['hideCaptions'] = $state(false);
	let contain: ImageProperties['contain'] = $state(false);
	let min: ImageProperties['min'] = $state(null);
	let max: ImageProperties['max'] = $state(null);
	let random: ImageProperties['random'] = $state(false);
	let response: ImageValue[] = $state([
		{
			label: '',
			value: '',
		},
	]);
	const imageResponseHandler = (response: ImageValue[]) => {
		events.push(response);
	};

	let labelsString = $state(JSON.stringify(labels));

	$effect(() => {
		labels = JSON.parse(labelsString);
	});
</script>

<Layout
	component="Image"
	{md}
	example={source(
		id,
		labels,
		multi,
		size,
		hideCaptions,
		contain,
		min,
		max,
		random,
		response
	)}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<PropsChanger
			label="Labels"
			bind:value={labelsString} />
		<PropsChanger
			label="Multi"
			bind:value={multi} />
		<PropsChanger
			label="Size"
			bind:value={size}
			selectOptions={['small', 'medium', 'large']} />
		<PropsChanger
			label="Hide Captions"
			bind:value={hideCaptions} />
		<PropsChanger
			label="Contain"
			bind:value={contain} />
		<PropsChanger
			label="Random"
			bind:value={random} />
		<PropsChanger
			label="Min"
			bind:value={min} />
		<PropsChanger
			label="Max"
			bind:value={max} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Image
				bind:labels
				{id}
				{multi}
				{size}
				{hideCaptions}
				{contain}
				{random}
				{response}
				onImageResponse={imageResponseHandler} />
		</div>
	{/snippet}
</Layout>
