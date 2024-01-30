<script lang="ts">
	import { Icon, type IconName, type IconSize } from '$lib';
	import { COLORS } from '$lib/_definitions';
	import ICON_DATA from '$lib/_icon_data';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let color = $state(COLORS.dark);
	let size: IconSize = $state(24);
	let name: IconName = $state('bell');
	let debug = $state(false);

	let sizeAsString = $derived(size.toString());

	// size = Number(sizeAsString) as IconSize;
</script>

<Layout
	component="Icon"
	example={source(color, size, name)}
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
			select
			selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]}
			bind:value={size} />
		<PropsChanger
			label="Name"
			select
			selectOptions={Object.keys(ICON_DATA)}
			bind:value={name} />
		<PropsChanger
			label="Debug"
			checkbox
			bind:value={debug} />
	{/snippet}
	{#snippet main()}
		<Icon
			{color}
			{size}
			{name}
			{debug} />
	{/snippet}
</Layout>
