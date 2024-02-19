<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { ComponentEvent, MultipleChoice } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state<ComponentEvent<MultipleChoiceValue[]>[]>([]);
	// let keys = $state(0);

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
	// let min: MultipleChoiceProperties['min'] = $state(null);
	// let max: MultipleChoiceProperties['max'] = $state(null);
	let response: MultipleChoiceValue[] = $state([]);
	let other: MultipleChoiceProperties['other'] = $state('Other');
	const multipleChoiceResponseHandler = (
		event: ComponentEvent<MultipleChoiceValue[]>
	) => {
		events.push(event);
	};

	// let labelsString = $state(JSON.stringify(labels));

	// $effect(() => {
	// 	labels = JSON.parse(labelsString);
	// });
</script>

<Layout
	component="MultipleChoice"
	example={source({ id, labels, multi, layout, random, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<!-- <PropsChanger
			label="Labels"
			bind:value={labelsString} /> -->
		<PropsChanger
			label="Multi"
			bind:value={multi} />
		<PropsChanger
			label="Layout"
			selectOptions={['1', '2', '3', '4', 'dropdown']}
			bind:value={layout} />
		<PropsChanger
			label="Other"
			bind:value={other} />
		<PropsChanger
			label="Random"
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
			onMultipleChoiceResponse={multipleChoiceResponseHandler} />
	{/snippet}
</Layout>
