<script lang="ts">
	import { Badge, Icon } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let color: 'yellow' | 'blue' | 'pink' | 'green' = $state('yellow');
	let flat: boolean = $state(false);
	let content: string = $state('Pro');
</script>

<Layout
	component="Badge"
	example={source(color, content, flat)}
	{md}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				select="Color"
				selectOptions={['yellow', 'blue', 'pink', 'green']}
				oninput={(e: Event) => {
			color = (e.target as HTMLInputElement).value as 'yellow' | 'blue' | 'pink' | 'green';
		}} />
			<PropsChanger
				text="Content"
				oninput={(e: Event) => {
			content = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				boolean="Flat"
				value={flat}
				oninput={(e: Event) => {
			flat = (e.target as HTMLInputElement).checked;
		}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Badge
			{color}
			{flat}>
			{content}</Badge>
	{/snippet}
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
