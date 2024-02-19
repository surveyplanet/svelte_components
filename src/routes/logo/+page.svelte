<script lang="ts">
	import { Logo, type LogoProps } from '$lib';
	import { COLORS } from '$lib/_definitions';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let color: LogoProps['color'] = $state(COLORS.black);
	let size: LogoProps['size'] = $state(48);
	let fill: LogoProps['fill'] = $state('blue');
	let symbolOnly: LogoProps['symbolOnly'] = $state(true);
</script>

<Layout
	component="Logo"
	example={source({ size, fill, color, symbolOnly })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Color"
			selectOptions={['white', 'black']}
			bind:value={color} />
		<PropsChanger
			label="Size"
			bind:value={size}
			selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]} />
		<PropsChanger
			label="Fill"
			bind:value={fill}
			selectOptions={[
				'blue',
				'yellow',
				'pink',
				'green',
				'transparent',
			]} />

		<PropsChanger
			label="Symbol only"
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
