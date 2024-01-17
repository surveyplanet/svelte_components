<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { MultipleChoice } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
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
	let other: MultipleChoiceProperties['other'] = $state(undefined);
	const multipleChoiceResponseHandler = (event: CustomEvent) => {
		events.push('response');
	};
</script>

<Layout
	component="MultipleChoice"
	example={source(id, labels, multi, layout, random, min, max, response)}
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
				text="Multi"
				value={multi} />
			<PropsChanger
				number="Layout"
				value={layout} />
			<PropsChanger
				boolean="Random"
				value={random} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)} />
			<PropsChanger
				boolean="Other"
				value={other} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<MultipleChoice
			{id}
			{labels}
			{multi}
			{layout}
			{random}
			{response}
			{other}
			on:response={multipleChoiceResponseHandler} />
	</svelte:fragment>
</Layout>
