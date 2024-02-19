<script lang="ts">
	import { type LoaderProps, Loader } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let events: string[] = $state([]);

	let colors: LoaderProps['colors'] = $state();
	let size: LoaderProps['size'] = $state(20);
	let strokeWidth: LoaderProps['strokeWidth'] = $state(4);

	// function getRandomColors(min = 4, max = 20) {
	// 	const rand = Math.floor(Math.random() * (max - min + 1) + min); // random number between 20 and 4
	// 	return Array.from(
	// 		{ length: rand },
	// 		() => `#${Math.floor(Math.random() * 16777215).toString(16)}` // random hex color
	// 	);
	// }

	// let colorsStringed = $state(JSON.stringify(colors));
	// $effect(() => {
	// 	colors = JSON.parse(colorsStringed);
	// });
</script>

<Layout
	component="Loader"
	example={source({ colors, size, strokeWidth })}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Colors"
			value={colors} /> -->
		<PropsChanger
			label="Size"
			bind:value={size} />
		<PropsChanger
			label="Stroke Width"
			selectOptions={[1, 2, 3, 4]}
			bind:value={strokeWidth} />
	{/snippet}
	{#snippet main()}
		<Loader
			{colors}
			{size}
			{strokeWidth} />
	{/snippet}
</Layout>
