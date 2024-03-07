<script
	lang="ts"
	context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	export type UploadProps = HTMLInputAttributes & {
		id?: string;
		label?: string;
		formats?: string[];
		maxSize?: number;
		note?: string;
		onUploadComplete?: (
			event: ComponentEvent<UploadData, HTMLInputElement>
		) => void;
		onUploadError?: (event: ComponentErrorEvent) => void;
	};

	export type UploadData = {
		image: File;
		data: string | ArrayBuffer | null;
	};
</script>

<script lang="ts">
	import { Button, Icon, ComponentEvent, ComponentErrorEvent } from './';
	import { COLORS } from '$lib/index';
	import { uniqueId } from '@surveyplanet/utilities';

	let {
		id = uniqueId(),
		label,
		formats = ['apng', 'avif', 'gif', 'jpeg', 'png', 'webp'],
		maxSize = 10, // default to 10MB which seems to be a reasonable size  for an image
		note,
		onUploadComplete,
		onUploadError,
		...attr
	} = $props<UploadProps>();

	type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

	let fileinput: HTMLInputElement | null = $state(null);
	const formatAccept = formats?.join(',');

	const fileSelected = (event: Event) => {
		let target = event.target as FileEventTarget | DataTransfer;
		let image = target.files[0];
		let reader = new FileReader();
		// check file.type and file.size
		if (image.size > maxSize * 1024 * 1024) {
			const error = new Error('File size is too large');
			if (typeof onUploadError === 'function') {
				const componentErrorEvent = new ComponentErrorEvent(error);
				onUploadError(componentErrorEvent);
			} else {
				throw error;
			}

			return;
		}

		reader.readAsDataURL(image);
		reader.onloadend = () => {
			let data = reader.result;
			if (typeof onUploadComplete === 'function') {
				const componentEvent = new ComponentEvent(
					{ image, data },
					target as HTMLInputElement,
					event
				);
				onUploadComplete(componentEvent);
			}
		};
	};

	const fileInputHandler = (event: Event) => {
		if (!event.target) {
			return;
		}
		fileSelected(event);
	};

	const dragOverHandler = (event: DragEvent) => {
		event.preventDefault();
	};

	const dropHandler = (event: DragEvent) => {
		event.preventDefault();
		if (!event.dataTransfer) {
			return;
		}
		fileSelected(event);
	};

	const onButtonClick = () => {
		if (fileinput) {
			fileinput.click();
		}
	};
</script>

<label
	class="sp-form-control sp-image-upload"
	for={id}
	aria-dropeffect="copy"
	on:drop={dropHandler}
	on:dragover={dragOverHandler}>
	<Button
		{onButtonClick}
		round={false}>
		{label}
		<Icon
			size={12}
			name="plus"
			color={COLORS.white} />
	</Button>

	<input
		{id}
		{...attr}
		bind:this={fileinput}
		class="sp-image-upload--input"
		type="file"
		accept={formatAccept}
		onchange={fileInputHandler} />

	{#if note}
		<p class="sp-image-upload--note">{note}</p>
	{/if}
</label>
