<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Loader } from '$lib';

	import { default as source } from './source';
	export let Hst: Histoire;
	let colors: string[];
	// let colors: string[] = getRandomColors(50, 100);
	let size = 60;
	let strokeWidth: 1 | 2 | 3 | 4 = 4;

	// function getRandomColors(min = 4, max = 20) {
	// 	const rand = Math.floor(Math.random() * (max - min + 1) + min); // random number between 20 and 4
	// 	return Array.from(
	// 		{ length: rand },
	// 		() => `#${Math.floor(Math.random() * 16777215).toString(16)}` // random hex color
	// 	);
	// }
</script>

<Hst.Story title="Loader">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={colors}
			title="Colors" />
		<Hst.Number
			bind:value={size}
			title="Size" />
		<Hst.Number
			bind:value={strokeWidth}
			title="Stroke width" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(colors, size, strokeWidth)}>
		<div class="wrapper">
			<Loader
				{colors}
				{size}
				{strokeWidth} />
		</div>
	</Hst.Variant>
</Hst.Story>
