<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import { ComponentEvent, Scale } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state<ScaleValue[][]>([]);
	// let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: ScaleProperties['min'] = $state(0);
	let max: ScaleProperties['max'] = $state(10);
	let response: ScaleValue[] = $state([]);
	const scaleResponseHandler = (event: ComponentEvent<ScaleValue[]>) => {
		events.push(event.value!);
	};
</script>

<Layout
	component="Scale"
	example={source({ id, min, max, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<PropsChanger
			label="Min"
			bind:value={min} />
		<PropsChanger
			label="Max"
			bind:value={max} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Scale
				{id}
				{min}
				{max}
				{response}
				onScaleResponse={scaleResponseHandler} />
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
