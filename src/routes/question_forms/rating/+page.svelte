<script lang="ts">
	import type { RatingValue, RatingProperties } from '@surveyplanet/types';
	import { Rating } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

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
	const ratingResponseHandler = (response: RatingValue[]) => {
		events.push(JSON.stringify(response));
	};
</script>

<Layout
	component="Rating"
	example={source(id, labels, order, layout, response)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id}
				oninput={(e: Event) => {
						id = (e.target as HTMLInputElement).value;
					}} />
			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)}
				oninput={(e: Event) => {
						labels = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				select="Order"
				value={order}
				selectOptions={[
					'default',
					'random',
					'asc_title',
					'desc_title',
					'asc_value',
					'desc_value',
				]}
				oninput={(e: Event) => {
						order = ((e.target as HTMLInputElement).value) as RatingProperties['order'];
					}} />
			<PropsChanger
				select="Layout"
				value={layout}
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
				]}
				oninput={(e: Event) => {
						layout = (e.target as HTMLInputElement).value as RatingProperties['layout'];
					}} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Rating
				{id}
				{labels}
				{order}
				{layout}
				{response}
				ratingResponse={ratingResponseHandler} />
		</div>
	</svelte:fragment>
</Layout>

<style>
	.wrapper {
		display: block;
		width: 500px;
		height: 100px;
		padding: 20px;
	}
</style>
