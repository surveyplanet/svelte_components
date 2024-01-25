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
		events.push(JSON.stringify(response, null, 2));
	};
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
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id}
				oninput={(e:Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />

			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)}
				oninput={(e:Event) => {
					labels = JSON.parse((e.target as HTMLInputElement).value);
					console.log(labels);
				}} />
			<PropsChanger
				boolean="Multi"
				value={multi}
				oninput={(e:Event) => {
					multi = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				select="Size"
				value={size}
				selectOptions={['small', 'medium', 'large']}
				oninput={(e:Event) => {
					size = (e.target as HTMLInputElement).value as ImageProperties['size'];
				}} />
			<PropsChanger
				boolean="Hide Captions"
				value={hideCaptions}
				oninput={(e:Event) => {
					hideCaptions = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="Contain"
				value={contain}
				oninput={(e:Event) => {
					contain = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="Random"
				value={random}
				oninput={(e:Event) => {
					random = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)}
				oninput={(e:Event) => {
					response = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="Min"
				value={min}
				oninput={(e:Event) => {
					min = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="Max"
				value={max}
				oninput={(e:Event) => {
					max = Number((e.target as HTMLInputElement).value);
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Image
				bind:labels
				bind:id
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
