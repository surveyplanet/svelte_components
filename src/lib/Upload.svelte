<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Icon } from '$lib/index';
	import { COLORS } from '$lib/index';

	export let label = 'Upload';
	export let formats: string[] = ['.jpg', '.jpeg', '.png', '.gif'];
	export let maxSize = 10;

	type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

	let fileinput: HTMLInputElement;
	$: note =
		` ${formats.join(', ').toUpperCase().replaceAll('.', '')}.` +
		` Up to ${maxSize}MB`;
	const formatAccept = formats.join(',');
	const dispatchChange = createEventDispatcher<{
		change: { image: File; data: string | ArrayBuffer | null };
	}>();

	const fileSelected = (target: FileEventTarget) => {
		let image = target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onloadend = () => {
			let data = reader.result;
			dispatchChange('change', { image, data });
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
	class="sp-image-upload"
	role="button"
	tabindex="0"
	id="drop_zone"
	aria-dropeffect="copy"
	on:drop={dropHandler}
	on:dragover={dragOverHandler}>
	<Button
		on:click={() => {
			fileinput.click();
		}}
		variant="primary"
		round={false}>
		{label}
		<Icon
			size={12}
			name="plus"
			color={COLORS.white} />
	</Button>

	<input
		class="sp-image-upload--input"
		type="file"
		accept={formatAccept}
		on:change={fileInputHandler}
		bind:this={fileinput} />

	{#if note?.length}
		<p class="sp-image-upload--note">{note}</p>
	{/if}
</div>
