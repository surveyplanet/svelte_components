<script lang="ts">
	import { Icon, type IconProps } from '$lib';
	import { COLORS } from '$lib/_definitions';
	import ICON_DATA from '$lib/_icon_data';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let color: IconProps['color'] = $state(COLORS.dark);
	let size: IconProps['size'] = $state(24);
	let name: IconProps['name'] = $state('bell');
	let debug: IconProps['debug'] = $state(false);
</script>

<Layout
	component="Icon"
	example={source({ color, size, name })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Color"
			selectOptions={Object.keys(COLORS)}
			bind:value={color} />
		<PropsChanger
			label="Size"
			selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]}
			bind:value={size} />
		<PropsChanger
			label="Name"
			selectOptions={Object.keys(ICON_DATA)}
			bind:value={name} />
		<PropsChanger
			label="Debug"
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
