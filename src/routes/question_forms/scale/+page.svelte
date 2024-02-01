<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import { Scale } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: ScaleProperties['min'] = $state(0);
	let max: ScaleProperties['max'] = $state(10);
	let response: ScaleValue[] = $state([]);
	const scaleResponseHandler = (response: ScaleValue[]) => {
		events.push(response);
	};
</script>

<Layout
	component="Scale"
	example={source(id, min, max, response)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			text
			bind:value={id} />
		<PropsChanger
			label="Min"
			number
			bind:value={min} />
		<PropsChanger
			label="Max"
			number
			bind:value={max} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Scale
				{id}
				{min}
				{max}
				{response}
				scaleResponse={scaleResponseHandler} />
		</div>{/snippet}
</Layout>

<style>
	.wrapper {
		display: block;
		width: 500px;
		height: 100px;
		padding: 20px;
	}
</style>
