<script lang="ts">
	import { Breadcrumbs, type BreadcrumbData } from '$lib';
	import {
		Layout,
		// PropsChanger
	} from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	// let keys = $state(0);

	let data: BreadcrumbData[] = $state([
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
	// let dataString = $state(JSON.stringify(data));
	// $effect(() => {
	// 	data = JSON.parse(dataString);
	// });
</script>

<Layout
	component="Breadcrumbs"
	example={source(data)}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Data"
			bind:value={dataString} /> -->
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
