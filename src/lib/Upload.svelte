<script
	lang="ts"
	context="module">
	export type UploadProps = {
		label?: string;
		formats: string[];
		maxSize?: number;
		onUpload: (data: UploadData) => void;
	};

	export type UploadData = {
		image: File;
		data: string | ArrayBuffer | null;
	};
</script>

<script lang="ts">
	import { Button, Icon } from '$lib/index';
	import { COLORS } from '$lib/index';

	let {
		label = 'Upload',
		formats,
		maxSize = 10,
		onUpload,
	} = $props<UploadProps>();

	type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

	let fileinput: HTMLInputElement | null = $state(null);
	let note = $state(
		` ${formats?.join(', ').toUpperCase().replaceAll('.', '')}.` +
			` Up to ${maxSize}MB`
	);
	const formatAccept = formats?.join(',');

	const fileSelected = (target: FileEventTarget) => {
		let image = target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onloadend = () => {
			let data = reader.result;
			onUpload({ image, data });
		};
	};
	const fileInputHandler = (event: Event) => {
		if (!event.target) {
			return;
		}
		let target = event.target as FileEventTarget;
		fileSelected(target);
	};

	const dragOverHandler = (event: DragEvent) => {
		event.preventDefault();
	};

	const dropHandler = (event: DragEvent) => {
		event.preventDefault();
		if (!event.dataTransfer) {
			return;
		}
		fileSelected(event.dataTransfer);
	};
</script>

<div
	class="sp-form-control sp-image-upload"
	role="button"
	tabindex="0"
	id="drop_zone"
	aria-dropeffect="copy"
	on:drop={dropHandler}
	on:dragover={dragOverHandler}>
	<Button
		onButtonClick={() => {
			if (fileinput) {
				fileinput.click();
			}
		}}
		round={false}>
		{label}
		<Icon
			size={12}
			name="plus"
			color={COLORS.white} />
	</Button>

	<input
		bind:this={fileinput}
		class="sp-image-upload--input"
		type="file"
		accept={formatAccept}
		onchange={fileInputHandler} />

	{#if note?.length}
		<p class="sp-image-upload--note">{note}</p>
	{/if}
</div>
