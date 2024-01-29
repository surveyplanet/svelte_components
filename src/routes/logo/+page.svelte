<script lang="ts">
	import {
		Logo,
		type LogoSize,
		type LogoFillColor,
		type LogoColor,
	} from '$lib';
	import { COLORS } from '$lib/_definitions';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let color: LogoColor = $state(COLORS.black);
	let size: LogoSize = $state(48);
	let fill: LogoFillColor = $state('blue');
	let symbolOnly: boolean = $state(true);

	// let sizeAsString = $derived(size.toString());

	const fillPropChangerHandler = (e: Event) => {
		fill = (e.target as HTMLSelectElement).value as LogoFillColor;
	};
</script>

<Layout
	component="Logo"
	example={source(size, fill, color, symbolOnly)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="Color"
				value={color}
				oninput={(e: Event) => {
					color = (e.target as HTMLSelectElement).value as LogoColor;
				}} />
			<PropsChanger
				select="Size"
				value={size}
				selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]}
				oninput={(e: Event) => {
					size = Number((e.target as HTMLInputElement).value) as LogoSize;
				}} />
			<PropsChanger
				select="Fill"
				value={fill}
				selectOptions={[
					'blue',
					'yellow',
					'pink',
					'green',
					'transparent',
				]}
				oninput={fillPropChangerHandler} />

			<!-- type='boolean', label="Symbol only" -->
			<PropsChanger
				boolean="Symbol only"
				value={symbolOnly}
				oninput={(e: Event) => { symbolOnly = (e.target as HTMLInputElement).checked; console.log(symbolOnly) }} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Logo
			{color}
			{size}
			{fill}
			{symbolOnly} />
	{/snippet}
</Layout>
