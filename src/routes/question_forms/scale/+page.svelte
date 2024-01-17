<script lang="ts">
	import type { ScaleValue, ScaleProperties } from '@surveyplanet/types';
	import { Scale } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: ScaleProperties['min'] = $state(0);
	let max: ScaleProperties['max'] = $state(10);
	let response: ScaleValue[] = $state([]);
	const scaleResponseHandler = (event: CustomEvent) => {
		events.push('response');
	};
</script>

<Layout
	component="Scale"
	example={source(id, min, max, response)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id} />
			<PropsChanger
				text="Min"
				value={min} />
			<PropsChanger
				text="Max"
				value={max} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Scale
				{id}
				{min}
				{max}
				{response}
				on:response={scaleResponseHandler} />
		</div></svelte:fragment>
</Layout>

<style>
	.wrapper {
		display: block;
		width: 500px;
		height: 100px;
		padding: 20px;
	}
</style>
