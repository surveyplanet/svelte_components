<script lang="ts">
	import type { ImageProperties, ImageValue } from '@surveyplanet/types';
	import { Image } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: ImageProperties['labels'] = [
		{
			image: 'https://media.surveyplanet.com/testing/default',
			label: 'Image 1',
		},
		{
			image: 'https://media.surveyplanet.com/testing/no-extension-jpg',
			label: 'Image 2',
		},
	];
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
	const imageResponseHandler = (event: CustomEvent) => {
		events.push('response');
	};
</script>

<Layout
	component="Image"
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
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id} />
			<PropsChanger
				object="Labels"
				value={labels.toString()} />
			<PropsChanger
				text="Multi"
				value={multi} />
			<PropsChanger
				text="Size"
				value={size} />
			<PropsChanger
				text="Hide Captions"
				value={hideCaptions} />
			<PropsChanger
				text="Contain"
				value={contain} />
			<PropsChanger
				number="Min"
				value={min} />
			<PropsChanger
				number="Max"
				value={max} />
			<PropsChanger
				text="Random"
				value={random} />
			<PropsChanger
				object="Response"
				value={response.toString()} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Image
				{id}
				{labels}
				{multi}
				{size}
				{hideCaptions}
				{contain}
				{random}
				{response} />
		</div>
	</svelte:fragment>
</Layout>
