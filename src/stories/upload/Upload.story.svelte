<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Upload } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props

	let label = 'Upload';
	let formats = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
	let maxSize = 10;

	const imageUploadChangeHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);

		setUpload(event.detail);
	};

	const setUpload = (event: {
		upload: File;
		data: string | ArrayBuffer | null;
	}) => {
		let data = event.data;
		let img = document.getElementById('upload') as HTMLImageElement;
		img.src = data as string;
		img.classList.remove('none');
	};
</script>

<Hst.Story title="Upload">
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
			<Upload
				{label}
				{formats}
				{maxSize}
				on:change={imageUploadChangeHandler} />
		</div>

		<embed
			id="upload"
			class="image-upload none"
			width="1000"
			height="1000" />
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	#upload {
		width: 100%;
		height: auto;
	}
	.none {
		display: none;
	}
</style>
