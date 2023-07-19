<script lang="ts">
	import type { RangeValue, RangeProperties } from '@surveyplanet/types';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Range } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id: string = 'abc123';
	let min: RangeProperties['min'] = 0;
	let max: RangeProperties['max'] = 10;
	let response: RangeValue[] = [];
	const rangeInputHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Question forms / Range">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Number
			bind:value={min}
			title="Min" />
		<Hst.Number
			bind:value={max}
			title="Max" />
		<Hst.Json
			bind:value={response}
			title="Response" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(id, min, max, response)}>
		<div class="wrapper">
			<Range
				{id}
				{min}
				{max}
				{response}
				on:input={rangeInputHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
