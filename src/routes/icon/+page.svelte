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

	let sizeAsString = $state(size.toString());

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
				text="Color"
				textInputHandler={(e: Event) => {
					color = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Size"
				textInputHandler={(e: Event) => {
					sizeAsString = (e.target as HTMLInputElement).value;
					size = Number(sizeAsString) as IconSize;
				}} />
			<PropsChanger
				text="Name"
				textInputHandler={(e: Event) => {
					name = (e.target as HTMLInputElement).value as IconName;
				}} />
			<PropsChanger
				text="Debug"
				textInputHandler={(e: Event) => {
					debug = (e.target as HTMLInputElement).value === 'true';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Icon
			on:click={(e) => {
				events.push('click');
			}}
			{color}
			{size}
			{name}
			{debug} />
	</svelte:fragment>
</Layout>
