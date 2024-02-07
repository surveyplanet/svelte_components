<script lang="ts">
	import { Footer, type FooterData } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let footerData: FooterData[] = $state([
		{
			link: '/about',
			label: 'About',
		},
		{
			link: '/terms',
			label: 'Terms Of Service',
		},
		{
			link: '/contact',
			label: 'Contact',
		},
		{
			label: '© 2022 SurveyPlanet, LLC',
		},
	]);

	let dataStringed = $state(JSON.stringify(footerData));
	$effect(() => {
		footerData = JSON.parse(dataStringed);
	});
</script>

<Layout
	component="Footer"
	example={source(footerData)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Footer Data"
			bind:value={dataStringed} />
	{/snippet}
	{#snippet main()}
		<Footer bind:footerData />
	{/snippet}
</Layout>
