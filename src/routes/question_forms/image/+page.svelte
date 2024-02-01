<script lang="ts">
	import type { ImageProperties, ImageValue } from '@surveyplanet/types';
	import { Image } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
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
			text
			bind:value={id}
			oninput={(e:Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />

		<PropsChanger
			label="Labels"
			object
			bind:value={labelsString} />
		<PropsChanger
			label="Multi"
			checkbox
			bind:value={multi} />
		<PropsChanger
			label="Size"
			select
			bind:value={size}
			selectOptions={['small', 'medium', 'large']} />
		<PropsChanger
			label="Hide Captions"
			checkbox
			bind:value={hideCaptions} />
		<PropsChanger
			label="Contain"
			checkbox
			bind:value={contain} />
		<PropsChanger
			label="Random"
			checkbox
			bind:value={random} />
		<PropsChanger
			label="Min"
			number
			bind:value={min} />
		<PropsChanger
			label="Max"
			number
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
				imageResponse={imageResponseHandler} />
		</div>
	{/snippet}
</Layout>
