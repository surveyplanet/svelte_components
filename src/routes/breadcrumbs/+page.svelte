<script lang="ts">
	import { Breadcrumbs, type BreadcrumbData } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

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

	$inspect(data);
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
				oninput={(event: Event) => {
				console.log(data);
			//doesn't work
			data = JSON.parse((event.target as HTMLInputElement).value);

		}}
				onblur={() => {
					keys++;
					console.log('blur', [...data]);
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
