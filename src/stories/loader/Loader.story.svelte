<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Loader } from '$lib';

	// import { default as source } from './source';
	export let Hst: Histoire;
	let colors: string[] = [
		'#e2bd60',
		'#79c5e5',
		'#dc8dbb',
		'#7de3a2',
		'#034cfd',
		'#ce3129',
		'#baf522',
		'#000000',
	];
	let size: 'small' | 'medium' | 'large' = 'large';
</script>

<Hst.Story title="Loader">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={colors}
			title="Loader items" />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={['small', 'medium', 'large']} />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div class="wrapper">
			<Loader
				{colors}
				{size} />
		</div>
	</Hst.Variant>
</Hst.Story>
