<script lang="ts">
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { Drawer, type DrawerProps } from '$lib';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let open: DrawerProps['open'] = $state(true);
	let duration: DrawerProps['duration'] = $state(1000);
	let placement: DrawerProps['placement'] = $state('left');
	let size: DrawerProps['size'] = $state('300px');
	let children: DrawerProps['children'] = $state(
		'<h1>Drawer Content</h1> <p>Some text</p>'
	);
</script>

<Layout
	component="Drawer"
	example={source(open, duration, placement, size, children)}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Open"
			bind:value={open} />
		<PropsChanger
			label="Duration"
			bind:value={duration} />
		<PropsChanger
			label="Placement"
			bind:value={placement} />
		<PropsChanger
			label="Size"
			bind:value={size} />
		<PropsChanger
			label="Content"
			bind:value={children} />
	{/snippet}
	{#snippet main()}
		<Drawer
			{open}
			{duration}
			{placement}
			{size}>
			{@html children}
		</Drawer>
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
