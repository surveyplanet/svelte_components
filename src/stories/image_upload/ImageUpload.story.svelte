<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ImageUpload } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	const imageUploadChangeHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);

		setImage(event.detail);
	};

	const setImage = (event: {
		image: File;
		data: string | ArrayBuffer | null;
	}) => {
		let data = event.data;
		let img = document.getElementById('image') as HTMLImageElement;
		img.src = data as string;
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
		<img
			id="image"
			alt="test_image" />
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	#image {
		width: 100%;
		height: auto;
	}
</style>
