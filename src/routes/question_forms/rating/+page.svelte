<script lang="ts">
	import type { RatingValue, RatingProperties } from '@surveyplanet/types';
	import { ComponentEvent, Rating } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<RatingValue[]>[]>([]);
	// let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: RatingProperties['labels'] = $state([
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
	]);
	let order: RatingProperties['order'] = $state('default');
	let layout: RatingProperties['layout'] = $state('1');
	let response: RatingValue[] = $state([]);
	const ratingResponseHandler = (event: ComponentEvent<RatingValue[]>) => {
		events.push(event);
	};
	// let labelStringed = $state(JSON.stringify(labels));

	// $effect(() => {
	// 	labels = JSON.parse(labelStringed);
	// });
</script>

<Layout
	component="Rating"
	example={source({ id, labels, order, layout, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<!-- <PropsChanger
			label="Labels"
			bind:value={labelStringed} /> -->
		<PropsChanger
			label="Order"
			bind:value={order}
			selectOptions={[
				'default',
				'random',
				'asc_title',
				'desc_title',
				'asc_value',
				'desc_value',
			]} />
		<PropsChanger
			label="Layout"
			bind:value={layout}
			selectOptions={[
				'1',
				'2',
				'3',
				'4',
				'slider',
				'star',
				'heart',
				'smiley',
				'thumbs',
			]} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Rating
				{id}
				bind:labels
				{order}
				{layout}
				{response}
				onRatingResponse={ratingResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style>
	.wrapper {
		display: block;
		width: 500px;
		height: 100px;
		padding: 20px;
	}
</style>
