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

	const imageUploadChangeHandler = (uploadData: {
		image: File;
		data: string | ArrayBuffer | null;
	}) => {
		setUpload(uploadData);
		events.push(JSON.stringify(uploadData));
	};

	const setUpload = (uploadData: {
		image: File;
		data: string | ArrayBuffer | null;
	}) => {
		let img = document.getElementById('upload') as HTMLImageElement;
		img.src = uploadData.data as string;
		img.classList.remove('none');
	};
</script>

<Layout
	component="Upload"
	example={source(label, formats, maxSize)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="Label"
				value={label}
				oninput={(e: Event) => {
						label = (e.target as HTMLInputElement).value;
					}} />
			<PropsChanger
				object="Formats"
				value={formats.toString()}
				oninput={(e: Event) => {
						formats = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				number="Max Size"
				value={maxSize}
				oninput={(e: Event) => {
						maxSize = parseInt((e.target as HTMLInputElement).value);
					}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Upload
				{label}
				{formats}
				{maxSize}
				onchange={imageUploadChangeHandler} />
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
