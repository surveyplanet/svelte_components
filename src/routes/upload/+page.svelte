<script lang="ts">
	import {
		Upload,
		ComponentEvent,
		type UploadData,
		type UploadProps,
		ComponentErrorEvent,
	} from '$lib';

	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	let events: ComponentEvent<UploadData, HTMLInputElement>[] &
		ComponentErrorEvent[] = $state([]);
	import { default as source } from './example';
	import { uniqueId } from '@surveyplanet/utilities';
	// let keys = $state(0);
	let id = $state(uniqueId());
	let label: UploadProps['label'] = $state('Upload');
	let formats: UploadProps['formats'] = $state([
		'.jpg',
		'.jpeg',
		'.png',
		'.gif',
		'.pdf',
	]);
	let maxSize: UploadProps['maxSize'] = $state(10);
	let note: UploadProps['note'] = $state('Upload a file');
	let preview: UploadProps['preview'] = $state(true);

	const onUploadComplete = (
		event: ComponentEvent<UploadData, HTMLInputElement>
	) => {
		if (event.value) {
			events.push(event);
		}
	};

	const onUploadError = (event: ComponentErrorEvent) => {
		console.log('error', event);
		events.push(event);
	};
</script>

<Layout
	component="Upload"
	example={source({ label, formats, maxSize, note, preview })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Id"
			bind:value={id} />
		<PropsChanger
			label="Label"
			bind:value={label} />
		<PropsChanger
			label="Formats"
			bind:value={formats} />
		<PropsChanger
			label="Max Size"
			bind:value={maxSize} />

		<PropsChanger
			label="Note"
			bind:value={note} />
		<PropsChanger
			label="Preview"
			bind:value={preview} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Upload
				{id}
				{label}
				bind:formats
				{maxSize}
				{note}
				{preview}
				{onUploadComplete}
				{onUploadError} />
		</div>
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
