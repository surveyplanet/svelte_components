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
		preview?: boolean;
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
		preview,
		onUploadComplete,
		onUploadError,
		...attr
	} = $props<UploadProps>();

	// type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

	let fileinput: HTMLInputElement | null = $state(null);
	let previewImage: HTMLEmbedElement | null = $state(null);
	let disabled = $state(false);
	const formatAccept = formats?.join(',');

	const fileSelected = (event: Event) => {
		let image: File | null;
		if (event instanceof DragEvent && event.dataTransfer) {
			image = event.dataTransfer.files[0];
		} else if (event.target instanceof HTMLInputElement) {
			image = event.target.files ? event.target.files[0] : null;
		} else {
			return;
		}

		let reader = new FileReader();
		// check file.type
		if (image && image.size && image.size > maxSize * 1024 * 1024) {
			const error = new Error('File size is too large');
			if (typeof onUploadError === 'function') {
				const componentErrorEvent = new ComponentErrorEvent(error);
				onUploadError(componentErrorEvent);
			} else {
				throw error;
			}

			return;
		}
		if (image?.type) {
			const fileExtension = '.' + image.type.split('/')[1];
			if (formats && !formats.includes(fileExtension)) {
				const error = new Error('File format is not supported');
				if (typeof onUploadError === 'function') {
					const componentErrorEvent = new ComponentErrorEvent(error);
					onUploadError(componentErrorEvent);
				} else {
					throw error;
				}

				return;
			}
		}

		reader.onerror = (error) => {
			if (typeof onUploadError === 'function') {
				const componentErrorEvent = new ComponentErrorEvent(
					error as unknown as Error
				);
				onUploadError(componentErrorEvent);
			} else {
				throw error;
			}
		};

		reader.onloadstart = () => {
			disabled = true;
		};

		if (image) {
			reader.readAsDataURL(image);
		}
		reader.onloadend = () => {
			disabled = false;
			let data = reader.result;
			if (preview && previewImage && reader.result) {
				previewImage.src = reader.result as string;
				previewImage.classList.remove('none');
			}
			if (typeof onUploadComplete === 'function' && image !== null) {
				const componentEvent = new ComponentEvent(
					{ image, data },
					event.target as HTMLInputElement,
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
	ondrop={dropHandler}
	ondragover={dragOverHandler}>
	{#if preview}
		<embed
			bind:this={previewImage}
			class="sp-image-upload--preview none"
			width="100%"
			height="100%" />
	{/if}
	<Button
		{onButtonClick}
		{disabled}
		loader
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
