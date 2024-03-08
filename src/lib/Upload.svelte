<script
	lang="ts"
	context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	export type UploadProps = HTMLInputAttributes & {
		id?: string;
		value?: string;
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
	import { delay, transformImage, uniqueId } from '@surveyplanet/utilities';

	let {
		id = uniqueId(),
		label,
		formats = ['apng', 'avif', 'gif', 'jpeg', 'png', 'webp'],
		maxSize = 10, // default to 10MB which seems to be a reasonable size  for an image
		note,
		preview,
		value,
		onUploadComplete,
		onUploadError,
		...attr
	} = $props<UploadProps>();

	// type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

	let fileinput: HTMLInputElement | null = $state(null);
	let previewImage: HTMLEmbedElement | null = $state(null);
	let disabled = $state(false);
	let isDragging = $state(false);
	const formatAccept = formats?.join(',');

	const fileSelected = async (event: Event) => {
		disabled = true;
		let image: File | null;
		if (event instanceof DragEvent && event.dataTransfer) {
			image = event.dataTransfer.files[0];
		} else if (event.target instanceof HTMLInputElement) {
			image = event.target.files ? event.target.files[0] : null;
		} else {
			return;
		}

		// let reader = new FileReader();
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

		const formData = new FormData();
		formData.append('image', image);

		const timeoutHandler = (ms: number) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					reject(new Error('Upload timeout'));
				}, ms);
			});
		};

		// This server (at: src/routes/upload/test/+server.ts ) will always return the same image.
		// User Promise.race catch timeout errors
		const response: Response = (await Promise.race([
			fetch('/upload/test', { method: 'POST', body: formData }),
			timeoutHandler(5000),
		])) as Response;

		// Handle the response
		if (!response.ok) {
			const error = new Error(`Upload failed: ${response.statusText}`);
			if (typeof onUploadError === 'function') {
				const componentErrorEvent = new ComponentErrorEvent(error);
				return onUploadError(componentErrorEvent);
			}
			throw error;
		}

		const json = await response.json();

		await delay(2000); // simulate upload delay
		value = `https://media.surveyplanet.com/${json.Key}`; // some images apis may not return the same JSON structure as AWS S3
		disabled = false;

		// reader.onerror = (error) => {
		// 	if (typeof onUploadError === 'function') {
		// 		const componentErrorEvent = new ComponentErrorEvent(
		// 			error as unknown as Error
		// 		);
		// 		onUploadError(componentErrorEvent);
		// 	} else {
		// 		throw error;
		// 	}
		// };

		// reader.onloadstart = () => {
		// 	disabled = true;
		// };

		// if (image) {
		// 	reader.readAsDataURL(image);
		// }
		// reader.onloadend = () => {
		// 	disabled = false;
		// 	let data = reader.result;
		// 	if (preview && previewImage && reader.result) {
		// 		previewImage.src = reader.result as string;
		// 		previewImage.classList.remove('none');
		// 	}
		// 	if (typeof onUploadComplete === 'function' && image !== null) {
		// 		const componentEvent = new ComponentEvent(
		// 			{ image, data },
		// 			event.target as HTMLInputElement,
		// 			event
		// 		);
		// 		onUploadComplete(componentEvent);
		// 	}
		// };
	};

	const fileInputHandler = (event: Event) => {
		if (!event.target) {
			return;
		}
		fileSelected(event);
	};

	const dragOverHandler = (event: DragEvent) => {
		event.preventDefault();
		isDragging = true;
	};

	const dragLeaveHandler = (event: DragEvent) => {
		event.preventDefault();
		isDragging = false;
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
	class:sp-image-upload--drag-over={isDragging}
	for={id}
	aria-dropeffect="copy"
	ondrop={dropHandler}
	ondragover={dragOverHandler}
	ondragleave={dragLeaveHandler}>
	{#if preview}
		<div class="sp-image-upload--preview">
			<!-- placeholder image -->

			{#if value?.length}
				<img
					src={transformImage(value, { width: 100, height: 100 })}
					alt="preview" />
			{:else}
				<Icon
					size={24}
					name="image"
					color={COLORS.beigeDark} />
			{/if}
		</div>
	{/if}
	<div class="sp-image-upload--inner">
		<Button
			{onButtonClick}
			{disabled}
			loader
			round={false}
			block
			size="small">
			{label}
			<Icon
				size={12}
				name="plus"
				color={COLORS.white} />
		</Button>
		{#if note}
			<div class="sp-image-upload--note">{note}</div>
		{/if}
	</div>

	<input
		{id}
		{...attr}
		bind:this={fileinput}
		class="sp-image-upload--input"
		type="file"
		accept={formatAccept}
		onchange={fileInputHandler} />
</label>
