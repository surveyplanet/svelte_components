<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Icon } from '$lib/index';
	import { COLORS } from '$lib/index';

	let fileinput: HTMLInputElement;
	type FileEventTarget = (EventTarget & { files: FileList }) | DataTransfer;

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
	id="drop_zone"
	on:drop={dropHandler}
	on:dragover={dragOverHandler}>
	<Button
		on:click={() => {
			fileinput.click();
		}}
		variant="primary"
		round={false}>
		Upload <Icon
			size={12}
			name="plus"
			color={COLORS.white} /></Button>
	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png, .gif"
		on:change={fileInputHandler}
		bind:this={fileinput} />
	<p>JPG, PNG or GIF. Up to 5MB.</p>
</div>

<style>
	.sp-image-upload {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}
</style>
