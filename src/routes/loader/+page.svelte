<script lang="ts">
	import { type LoaderProps, Loader } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let events: string[] = $state([]);

	let colors: LoaderProps['colors'] = $state();
	let size: LoaderProps['size'] = $state();
	let strokeWidth: LoaderProps['strokeWidth'] = $state();

	// function getRandomColors(min = 4, max = 20) {
	// 	const rand = Math.floor(Math.random() * (max - min + 1) + min); // random number between 20 and 4
	// 	return Array.from(
	// 		{ length: rand },
	// 		() => `#${Math.floor(Math.random() * 16777215).toString(16)}` // random hex color
	// 	);
	// }

	// can't Bind to 'colors' because it is has a fallback value
</script>

<Layout
	component="Loader"
	example={source({ colors, size, strokeWidth })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			type="string"
			label="Colors"
			bind:value={colors} />

		<PropsChanger
			type="number"
			label="Size"
			bind:value={size} />

		<PropsChanger
			label="Stroke width"
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
