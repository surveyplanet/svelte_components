<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { MultipleChoice } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id: string;
	let labels: MultipleChoiceProperties['labels'] = ['Harry', 'Larry', 'Moe'];
	let multi: MultipleChoiceProperties['multi'];
	let layout: MultipleChoiceProperties['layout'] = '1';
	let random: MultipleChoiceProperties['random'] = false;
	let min: MultipleChoiceProperties['min'];
	let max: MultipleChoiceProperties['max'];
	let response: MultipleChoiceValue[] = [];
	const multipleChoiceInputHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Question forms / Multiple Choice">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Json
			bind:value={labels}
			title="Labels" />
		<Hst.Select
			bind:value={layout}
			options={['1', '2', '3', '4', 'dropdown']}
			title="Layout" />
		<Hst.Checkbox
			bind:value={random}
			title="Random" />
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
		source={source(id, labels, multi, layout, random, min, max, response)}>
		<div class="wrapper">
			<MultipleChoice
				{id}
				{labels}
				{multi}
				{layout}
				{random}
				{min}
				{max}
				{response}
				on:input={multipleChoiceInputHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
