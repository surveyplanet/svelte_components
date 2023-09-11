<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ImageUpload } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props

	let label = 'Upload';
	let formats = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
	let maxSize = 10;

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
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Json
			bind:value={formats}
			title="Formats" />
		<Hst.Number
			bind:value={maxSize}
			title="Max Size" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source()}>
		<div class="wrapper">
			<ImageUpload
				{label}
				{formats}
				{maxSize}
				on:change={imageUploadChangeHandler} />
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
