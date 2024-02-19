<script lang="ts">
	import { Upload, ComponentEvent, type UploadData } from '$lib';

	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<UploadData>[]>([]);
	import { default as source } from './example';
	// let keys = $state(0);

	let label = $state('Upload');
	let formats = $state(['.jpg', '.jpeg', '.png', '.gif', '.pdf']);
	let maxSize = $state(10);

	const onUploadUpload = (event: ComponentEvent<UploadData>) => {
		if (event.value) {
			setUpload(event.value);
			events.push(event);
		}
	};

	const setUpload = (uploadData: {
		image: File;
		data: string | ArrayBuffer | null;
	}) => {
		let img = document.getElementById('upload') as HTMLImageElement;
		img.src = uploadData.data as string;
		img.classList.remove('none');
	};

	// let formatsStringed = $state(JSON.stringify(formats));

	// $effect(() => {
	// 	formats = JSON.parse(formatsStringed);
	// });
</script>

<Layout
	component="Upload"
	example={source({ label, formats, maxSize })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Label"
			bind:value={label} />
		<!-- <PropsChanger
			label="Formats"
			bind:value={formatsStringed} /> -->
		<PropsChanger
			label="Max Size"
			bind:value={maxSize} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Upload
				{label}
				bind:formats
				{maxSize}
				{onUploadUpload} />
		</div>

		<embed
			id="upload"
			class="image-upload none"
			width="1000"
			height="1000" />
	{/snippet}
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
