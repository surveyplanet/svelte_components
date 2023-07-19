<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Scale } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id: string = 'abc123';
	let min: ScaleProperties['min'] = 0;
	let max: ScaleProperties['max'] = 10;
	let response: ScaleValue[] = [];
	const scaleResponseHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Question forms / Scale">
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
			<Scale
				{id}
				{min}
				{max}
				{response}
				on:response={scaleResponseHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
