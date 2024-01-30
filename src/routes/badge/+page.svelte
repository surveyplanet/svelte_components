<script lang="ts">
	import { Badge, Icon } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let color: 'yellow' | 'blue' | 'pink' | 'green' = $state('yellow');
	let flat: boolean = $state(true);
	let content: string = $state('Pro');
</script>

<Layout
	component="Badge"
	example={source(color, content, flat)}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Color"
			select={true}
			selectOptions={['yellow', 'blue', 'pink', 'green']}
			bind:value={color} />
		<PropsChanger
			label="Content"
			text={true}
			bind:value={content} />
		<PropsChanger
			label="Flat"
			checkbox={true}
			bind:value={flat} />
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
