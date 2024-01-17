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

	let color: LogoColor = COLORS.black;
	let size: LogoSize = 256;
	let fill: LogoFillColor = 'blue';

	let sizeAsString = size.toString();
</script>

<Layout
	component="Logo"
	example={source(size, fill, color)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Color"
				value={color}
				textInputHandler={(e: Event) => {
					color = (e.target as HTMLSelectElement).value as LogoColor;
				}} />
			<PropsChanger
				text="Size"
				value={sizeAsString}
				textInputHandler={(e: Event) => {
					sizeAsString = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Fill"
				value={fill}
				textInputHandler={(e: Event) => {
					fill = (e.target as HTMLSelectElement).value as LogoFillColor;
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Logo
			on:click={(e) => {
				events.push('click');
			}}
			{color}
			{size}
			{fill} />
	</svelte:fragment>
</Layout>
