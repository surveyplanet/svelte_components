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
		request?: {
			url: string;
			method: 'POST' | 'PUT';
			headers?: Record<string, string>;
			authToken?: string;
		};

		onUploadComplete?: (
			event: ComponentEvent<UploadData, HTMLInputElement>
		) => void;
		onUploadError?: (event: ComponentErrorEvent) => void;
	};

	export type UploadData = {
		image: File | null;
		data: string | ArrayBuffer | null;
	};
</script>

<script lang="ts">
	import { Button, Icon, ComponentEvent, ComponentErrorEvent } from './';
	import { COLORS } from '$lib/index';
	import { transformImage, uniqueId } from '@surveyplanet/utilities';

	let {
		id = uniqueId(),
		label,
		formats = ['apng', 'avif', 'gif', 'jpeg', 'png', 'webp'],
		maxSize = 10, // default to 10MB which seems to be a reasonable size  for an image
		note,
		preview,
		value,
		request = {
			url: 'https://media.surveyplanet.com/',
			method: 'POST',
		},
		onUploadComplete,
		onUploadError,
		...attr
	}: UploadProps = $props();

	// type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

	let fileInput: HTMLInputElement | null = $state(null);
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

		if (image && image.size && image.size > maxSize * 1024 * 1024) {
			const error = new Error('File size is too large');
			disabled = false;
			if (typeof onUploadError === 'function') {
				const componentErrorEvent = new ComponentErrorEvent(error);
				onUploadError(componentErrorEvent);
			} else {
				throw error;
			}
		}
		if (image?.type) {
			const fileExtension = image.type.split('/')[1];
			if (formats && !formats.includes(fileExtension)) {
				disabled = false;
				const error = new Error('File format is not supported');
				if (typeof onUploadError === 'function') {
					const componentErrorEvent = new ComponentErrorEvent(error);
					onUploadError(componentErrorEvent);
				} else {
					throw error;
				}
			}
		}

		const formData = new FormData();
		if (image) {
			formData.append('image', image);
		}

		const timeoutHandler = (ms: number) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					const error = new Error('Request timed out');
					reject(error);
				}, ms);
			});
		};

		// User Promise.race catch timeout errors

		const headers = request.headers || {};

		if (request.authToken?.length) {
			headers['Authorization'] = `Bearer ${request.authToken}`;
		}
		try {
			const response: Response = (await Promise.race([
				fetch(request.url, {
					method: 'POST',
					body: formData,
					headers: headers,
				}),
				timeoutHandler(5000),
			])) as Response;

			if (!response.ok) {
				const error = new Error(
					`Upload failed: ${response.statusText}`
				);

				throw error;
			}

			const json = await response.json();

			value = json.Location;
			disabled = false;
			const componentEvent = new ComponentEvent(
				{ image, data: json.location },
				event.target as HTMLInputElement,
				event
			);

			if (typeof onUploadComplete === 'function' && image !== null) {
				onUploadComplete(componentEvent);
			}
		} catch (error) {
			disabled = false;
			if (typeof onUploadError === 'function') {
				const componentErrorEvent = new ComponentErrorEvent(
					error as Error
				);
				return onUploadError(componentErrorEvent);
			}
		}

		// Handle the response
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
		isDragging = false;
		fileSelected(event);
	};

	const onButtonClick = (
		event: ComponentEvent<undefined, HTMLButtonElement>
	) => {
		if (fileInput) {
			fileInput.click();
		}
	};

	const removeImageHandler = () => {
		value = undefined;
	};

	const fileInputClickHandler = (event: MouseEvent) => {
		// event.stopPropagation();
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
		bind:this={fileInput}
		class="sp-image-upload--input"
		type="file"
		accept={formatAccept}
		capture="user"
		onchange={fileInputHandler}
		onclick={fileInputClickHandler} />
</label>

{#if value !== undefined}
	<button
		class="sp-image-upload--remove"
		type="button"
		onclick={removeImageHandler}>
		Remove
	</button>
{/if}

<style>
	.sp-image-upload--remove {
		top: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 0.5rem;
		border: none;
		cursor: pointer;
	}
</style>
