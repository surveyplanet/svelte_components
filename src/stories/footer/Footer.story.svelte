<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Footer, type FooterData } from '$lib';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let footerData: FooterData[] = [
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
	];
</script>

<Hst.Story title="Footer">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={footerData}
			title="Footer items" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div class="wrapper">
			<Footer {footerData} />
		</div>
	</Hst.Variant>
</Hst.Story>
