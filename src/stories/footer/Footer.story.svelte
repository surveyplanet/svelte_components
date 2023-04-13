<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Footer, type FooterData } from '../../lib';
	import { logEvent } from 'histoire/client';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let footerData: FooterData[] = [
		{
			link: 'https://www.surveyplanet.com/about',
			label: 'About',
		},
		{
			link: 'https://www.surveyplanet.com/terms',
			label: 'Terms Of Service',
		},
		{
			link: 'https://www.surveyplanet.com/contact',
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
