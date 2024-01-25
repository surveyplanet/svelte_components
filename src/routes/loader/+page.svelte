<script lang="ts">
	import { Loader } from '$lib';

	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
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
	// let colors: string[] = getRandomColors(50, 100);
	let size = $state(60);
	let strokeWidth: 1 | 2 | 3 | 4 = $state(4);

	// function getRandomColors(min = 4, max = 20) {
	// 	const rand = Math.floor(Math.random() * (max - min + 1) + min); // random number between 20 and 4
	// 	return Array.from(
	// 		{ length: rand },
	// 		() => `#${Math.floor(Math.random() * 16777215).toString(16)}` // random hex color
	// 	);
	// }
</script>

<Layout
	component="Loader"
	example={source(colors, size, strokeWidth)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				object="Colors"
				value={JSON.stringify(colors)}
				oninput={(e: Event) => {
					colors = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Size"
				value={size.toString()}
				oninput={(e: Event) => {
					size = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Stroke Width"
				value={strokeWidth.toString()}
				oninput={(e: Event) => {
					strokeWidth = Number((e.target as HTMLInputElement).value) as 1 | 2 | 3 | 4;
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Loader
			{colors}
			{size}
			{strokeWidth} />
	{/snippet}
</Layout>
