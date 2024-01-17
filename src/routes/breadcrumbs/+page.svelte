<script lang="ts">
	import { Breadcrumbs, type BreadcrumbData } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

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
</script>

<Layout
	component="Breadcrumbs"
	example={source(data)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				object="Data"
				value={JSON.stringify(data)}
				textInputHandler={(e: Event) => {
			data = JSON.parse((e.target as HTMLInputElement).value);
		}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Breadcrumbs {data}></Breadcrumbs>
	</svelte:fragment>
</Layout>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
