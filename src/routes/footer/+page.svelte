<script lang="ts">
	import { Footer, type FooterProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: string[] = $state([]);

	let footerData: FooterProps['footerData'] = $state([
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
</script>

<Layout
	component="Footer"
	example={source(footerData)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Footer Data"
			bind:value={footerData} />
	{/snippet}
	{#snippet main()}
		<Footer bind:footerData />
	{/snippet}
</Layout>
