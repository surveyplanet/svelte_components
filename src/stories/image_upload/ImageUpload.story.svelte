<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ImageUpload } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	const imageUploadChangeHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Image Upload">
	<svelte:fragment slot="controls" />

	<Hst.Variant
		title="Primary"
		source={source()}>
		<div class="wrapper">
			<ImageUpload on:change={imageUploadChangeHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
