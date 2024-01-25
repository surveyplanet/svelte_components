<script lang="ts">
	import { Footer, type FooterData } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

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
</script>

<Layout
	component="Footer"
	example={source(footerData)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="Footer Data"
				value={JSON.stringify(footerData)}
				oninput={(e: Event) => {
					footerData = JSON.parse((e.target as HTMLInputElement).value);
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Footer {footerData} />
	{/snippet}
</Layout>
