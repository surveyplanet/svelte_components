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
	const ratingResponseHandler = (event: CustomEvent) => {
		events.push('response');
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
				value={id} />
			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)} />
			<PropsChanger
				text="Order"
				value={order} />
			<PropsChanger
				text="Layout"
				value={layout} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Rating
			{id}
			{labels}
			{order}
			{layout}
			{response}
			on:response={ratingResponseHandler} />
	</svelte:fragment>
</Layout>
