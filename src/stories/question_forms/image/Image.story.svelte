<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import type { ImageProperties, ImageValue } from '@surveyplanet/types';
	import { Image } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id: string = 'abc123';
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
	let multi: ImageProperties['multi'];
	let size: ImageProperties['size'] = 'medium';
	let hideCaptions: ImageProperties['hideCaptions'];
	let contain: ImageProperties['contain'] = false;
	let min: ImageProperties['min'];
	let max: ImageProperties['max'];
	let random: ImageProperties['random'] = true;
	let response: ImageValue[] = [
		{
			label: '',
			value: '',
		},
	];
	const imageResponseHandler = (event: CustomEvent) => {
		logEvent(event.type, event.detail);
	};
</script>

<Hst.Story title="Question forms / Image">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Json
			bind:value={labels}
			title="Labels" />
		<Hst.Select
			bind:value={size}
			options={['small', 'medium', 'large']}
			title="Size" />
		<Hst.Checkbox
			bind:value={hideCaptions}
			title="Hide Captions" />
		<Hst.Checkbox
			bind:value={contain}
			title="Contain" />
		<Hst.Checkbox
			bind:value={random}
			title="Randomize" />
		<Hst.Checkbox
			bind:value={multi}
			title="Multi" />
		{#if multi}
			<Hst.Number
				bind:value={min}
				title="Min" />
			<Hst.Number
				bind:value={max}
				title="Max" />
		{/if}
		<Hst.Json
			bind:value={response}
			title="Response" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(
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
		)}>
		<div class="wrapper">
			<Image
				{id}
				{labels}
				{multi}
				{size}
				{hideCaptions}
				{contain}
				{random}
				{min}
				{max}
				on:response={imageResponseHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
