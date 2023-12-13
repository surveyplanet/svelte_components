<script lang="ts">
	import type { RatingValue, RatingProperties } from '@surveyplanet/types';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Rating } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id = 'abc123';
	let labels: RatingProperties['labels'] = [
		{
			label: 'Very Unsatisfied',
			value: 1,
		},
		{
			label: 'Unsatisfied',
			value: 2,
		},
		{
			label: 'Somewhat Unsatisfied',
			value: 3,
		},
		{
			label: 'Somewhat Satisfied',
			value: 4,
		},
		{
			label: 'Satisfied',
			value: 5,
		},
		{
			label: 'Very Satisfied',
			value: 6,
		},
	];
	let order: RatingProperties['order'] = 'default';
	let layout: RatingProperties['layout'] = '1';
	let response: RatingValue[] = [];
	const ratingResponseHandler = (event: CustomEvent) => {
		logEvent(event.type, event.detail);
	};
</script>

<Hst.Story title="Question forms / Rating">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Json
			bind:value={labels}
			title="Labels" />
		{#if order !== null}
			<Hst.Select
				bind:value={order}
				options={[
					'default',
					'random',
					'asc_title',
					'desc_title',
					'asc_value',
					'desc_value',
				]}
				title="Order" />
		{/if}
		{#if layout !== null}
			<Hst.Select
				bind:value={layout}
				options={[
					'1',
					'2',
					'3',
					'4',
					'slider',
					'star',
					'heart',
					'smiley',
					'thumbs',
				]}
				title="Layout" />
		{/if}
		<Hst.Json
			bind:value={response}
			title="Response" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(id, labels, order, layout, response)}>
		<div class="wrapper">
			<Rating
				{id}
				{labels}
				{order}
				{layout}
				{response}
				on:response={ratingResponseHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
