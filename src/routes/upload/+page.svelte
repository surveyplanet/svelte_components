<script lang="ts">
	import { Upload } from '$lib';

	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	let label = $state('Upload');
	let formats = $state(['.jpg', '.jpeg', '.png', '.gif', '.pdf']);
	let maxSize = $state(10);

	const imageUploadChangeHandler = (event: CustomEvent) => {
		events.push('change');
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

<Layout
	component="Upload"
	example={source(label, formats, maxSize)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Label"
				value={label}
				textInputHandler={(e: Event) => {
						label = (e.target as HTMLInputElement).value;
					}} />
			<PropsChanger
				text="Formats"
				value={formats.toString()}
				textInputHandler={(e: Event) => {
						formats = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				text="Max Size"
				value={maxSize.toString()}
				textInputHandler={(e: Event) => {
						maxSize = parseInt((e.target as HTMLInputElement).value);
					}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
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
	</svelte:fragment>
</Layout>

<style lang="scss">
	#upload {
		width: 100%;
		height: auto;
	}
	.none {
		display: none;
	}
</style>
