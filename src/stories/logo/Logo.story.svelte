<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import source from './source';
	import { Logo, type LogoSize, type LogoFillColor } from '$lib';
	import { COLORS } from '$lib/_definitions';
	export let Hst: Histoire;

	let color = COLORS.black;
	let size: LogoSize = 256;
	let fill: LogoFillColor = 'blue';

	let sizeAsString = size.toString();

	$: {
		size = Number(sizeAsString) as LogoSize;
	}
</script>

<Hst.Story title="Logo">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={fill}
			title="Fill"
			options={['blue', 'yellow', 'pink', 'green', 'transparent'].map(
				(color) => {
					return {
						label:
							color.charAt(0).toUpperCase() +
							color.slice(1).toLowerCase(),
						value: color,
					};
				}
			)} />
		<Hst.Select
			bind:value={color}
			title="Color"
			options={[
				{
					label: 'Black',
					value: COLORS.black,
				},
				{
					label: 'White',
					value: COLORS.white,
				},
			]} />
		<Hst.Select
			bind:value={sizeAsString}
			title="Size"
			options={[8, 16, 20, 24, 32, 48, 64, 128, 256, 512].map((n) =>
				n.toString()
			)} />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(size, fill, color)}>
		<Logo
			{size}
			{color}
			{fill} />
	</Hst.Variant>
</Hst.Story>
