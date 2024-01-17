<script lang="ts">
	import { Badge, Icon } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let color: 'yellow' | 'blue' | 'pink' | 'green' = $state('yellow');
	let content: string = $state('Pro');
	let flat: boolean = $state(false);
</script>

<Layout
	component="Badge"
	example={source(color, content, flat)}
	{md}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Color"
				textInputHandler={(e: Event) => {
			color = (e.target as HTMLInputElement).value as 'yellow' | 'blue' | 'pink' | 'green';
		}} />
			<PropsChanger
				text="Content"
				textInputHandler={(e: Event) => {
			content = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Flat"
				textInputHandler={(e: Event) => {
			flat = (e.target as HTMLInputElement).value === 'true';
		}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Badge
			{color}
			{flat}>
			{content}</Badge>
	</svelte:fragment>
</Layout>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.props {
		border: 1px solid black;
	}
	.wrapper {
		background-color: $color--beige;
		border-radius: $size-radius--small;
	}
</style>
