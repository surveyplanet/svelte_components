<script lang="ts">
	import { Icon, type IconName, type IconSize } from '$lib';
	import { COLORS } from '$lib/_definitions';
	import ICON_DATA from '$lib/_icon_data';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
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
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				select="Color"
				selectOptions={Object.keys(COLORS)}
				oninput={(e: Event) => {
					color = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				select="Size"
				selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]}
				value={sizeAsString}
				oninput={(e: Event) => {
					size = Number(sizeAsString) as IconSize;
				}} />
			<PropsChanger
				select="Name"
				selectOptions={Object.keys(ICON_DATA)}
				value={name}
				oninput={(e: Event) => {
					name = (e.target as HTMLInputElement).value as IconName;
				}} />
			<PropsChanger
				boolean="Debug"
				value={debug}
				oninput={(e: Event) => {
					debug = (e.target as HTMLInputElement).checked
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Icon
			{color}
			{size}
			{name}
			{debug} />
	</svelte:fragment>
</Layout>
