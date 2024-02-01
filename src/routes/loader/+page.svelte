<script lang="ts">
	import { Loader } from '$lib';

	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let colors: string[] = $state([
		'#FF0000',
		'#FF7F00',
		'#FFFF00',
		'#4B0082',
		'#9400D3',
	]);
	let size = $state(60);
	let strokeWidth: 1 | 2 | 3 | 4 = $state(4);

	// function getRandomColors(min = 4, max = 20) {
	// 	const rand = Math.floor(Math.random() * (max - min + 1) + min); // random number between 20 and 4
	// 	return Array.from(
	// 		{ length: rand },
	// 		() => `#${Math.floor(Math.random() * 16777215).toString(16)}` // random hex color
	// 	);
	// }

	let colorsStringed = $state(JSON.stringify(colors));
	$effect(() => {
		colors = JSON.parse(colorsStringed);
	});
</script>

<Layout
	component="Loader"
	example={source(colors, size, strokeWidth)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Colors"
			object
			bind:value={colorsStringed} />
		<PropsChanger
			label="Size"
			number
			bind:value={size} />
		<PropsChanger
			label="Stroke Width"
			select
			selectOptions={[1, 2, 3, 4]}
			bind:value={strokeWidth} />
	{/snippet}
	{#snippet main()}
		<Loader
			bind:colors
			{size}
			{strokeWidth} />
	{/snippet}
</Layout>
