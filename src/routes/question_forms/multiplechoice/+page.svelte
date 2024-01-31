<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { MultipleChoice } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as MultipleChoice['value'][];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: MultipleChoiceProperties['labels'] = $state([
		'Harry',
		'Larry',
		'Moe',
	]);
	let multi: MultipleChoiceProperties['multi'] = $state(false);
	let layout: MultipleChoiceProperties['layout'] = $state('1');
	let random: MultipleChoiceProperties['random'] = $state(false);
	let min: MultipleChoiceProperties['min'] = $state(null);
	let max: MultipleChoiceProperties['max'] = $state(null);
	let response: MultipleChoiceValue[] = $state([]);
	let other: MultipleChoiceProperties['other'] = $state('Other');
	const multipleChoiceResponseHandler = (event: MultipleChoiceValue[]) => {
		events.push(event);
	};

	let labelsString = $state(JSON.stringify(labels));

	$effect(() => {
		labels = JSON.parse(labelsString);
	});
</script>

<Layout
	component="MultipleChoice"
	example={source(id, labels, multi, layout, random, min, max, response)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			text
			bind:value={id} />
		<PropsChanger
			label="Labels"
			object
			bind:value={labelsString} />
		<PropsChanger
			label="Multi"
			checkbox
			bind:value={multi} />
		<PropsChanger
			label="Layout"
			select
			selectOptions={['1', '2', '3', '4', 'dropdown']}
			bind:value={layout} />
		<PropsChanger
			label="Other"
			text
			bind:value={other} />
		<PropsChanger
			label="Random"
			checkbox
			bind:value={random} />
	{/snippet}
	{#snippet main()}
		<MultipleChoice
			{id}
			bind:labels
			{multi}
			{layout}
			{random}
			{response}
			{other}
			multipleChoiceResponse={multipleChoiceResponseHandler} />
	{/snippet}
</Layout>
