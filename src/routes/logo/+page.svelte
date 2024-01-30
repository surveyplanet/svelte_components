<script lang="ts">
	import {
		Logo,
		type LogoSize,
		type LogoFillColor,
		type LogoColor,
	} from '$lib';
	import { COLORS } from '$lib/_definitions';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let color: LogoColor = $state(COLORS.black);
	let size: LogoSize = $state(48);
	let fill: LogoFillColor = $state('blue');
	let symbolOnly: boolean = $state(true);

	// let sizeAsString = $derived(size.toString());
</script>

<Layout
	component="Logo"
	example={source(size, fill, color, symbolOnly)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsChanger
			label="Color"
			select
			selectOptions={Object.keys(COLORS)}
			bind:value={color} />
		<PropsChanger
			label="Size"
			bind:value={size}
			select
			selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]} />
		<PropsChanger
			label="Fill"
			bind:value={fill}
			select
			selectOptions={[
				'blue',
				'yellow',
				'pink',
				'green',
				'transparent',
			]} />

		<PropsChanger
			label="Symbol only"
			checkbox
			bind:value={symbolOnly} />
	{/snippet}
	{#snippet main()}
		<Logo
			{color}
			{size}
			{fill}
			{symbolOnly} />
	{/snippet}
</Layout>
