<script lang="ts">
	import { Badge, type BadgeProps } from '$lib';
	import { Layout, PropsChanger } from '../../layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let color: BadgeProps['color'] = $state('yellow');
	let flat: BadgeProps['flat'] = $state(true);
	let content: string = $state('Pro');
</script>

<Layout
	component="Badge"
	example={source({ color, content, flat })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Color"
			selectOptions={['yellow', 'blue', 'pink', 'green']}
			bind:value={color} />
		<PropsChanger
			label="Content"
			bind:value={content} />
		<PropsChanger
			label="Flat"
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
