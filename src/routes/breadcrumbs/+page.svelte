<script lang="ts">
	import { Breadcrumbs, type BreadcrumbsProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	// let keys = $state(0);

	let data: BreadcrumbsProps['data'] = $state([
		{
			name: 'Home',
			url: '/',
		},
		{
			name: 'Our test survey will show you how its done as an example ',
			url: '/about',
		},
		{
			name: 'Contact',
			url: '/contact',
		},
		{
			name: 'Submit',
		},
	]);
</script>

<Layout
	component="Breadcrumbs"
	example={source(data)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			bind:value={data}
			type="json" />
	{/snippet}
	{#snippet main()}
		<Breadcrumbs bind:data></Breadcrumbs>
	{/snippet}
</Layout>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
