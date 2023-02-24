<script lang="ts">
	import { Breadcrumbs } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	import source from './source';
	export let Hst;

	let breadcrumbs = [
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
			url: '/submit',
		},
	];
</script>

<Hst.Story title="Breadcrumbs">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={breadcrumbs}
			title="Content" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Breadcrumbs {breadcrumbs} />
	</Hst.Variant>
</Hst.Story>
