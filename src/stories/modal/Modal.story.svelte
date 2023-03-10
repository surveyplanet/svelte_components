<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Modal, Button, TextInput } from '../../lib';
	// import source from './source';
	export let Hst: Histoire;

	let title = 'Modal';
	let subtitle = 'Subtitle';
	let fullscreen = false;
	let overlay = false;
	let visible = false;
	let size: 'small' | 'medium' | 'large' = 'medium';

	const launchModal = () => {
		visible = true;
	};

	let modal: HTMLElement;

	const modalOpened = (e: Event): void => {
		logEvent('open', e);
	};

	const modalIn = (e: Event): void => {
		logEvent('in', e);
	};

	const modalOut = (e: Event): void => {
		logEvent('out', e);
	};

	const close = (e: Event) => {
		logEvent('close', e);
	};
</script>

<Hst.Story title="Modal">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={title}
			title="Title" />
		<Hst.Text
			bind:value={subtitle}
			title="Subtitle" />
		<Hst.Checkbox
			bind:value={fullscreen}
			title="Fullscreen" />
		<Hst.Checkbox
			bind:value={overlay}
			title="Overlay" />
		<Hst.Checkbox
			bind:value={visible}
			title="Visible" />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={[
				{ label: 'Small', value: 'small' },
				{ label: 'Medium', value: 'medium' },
				{ label: 'Large', value: 'large' },
			]} />
	</svelte:fragment>

	<Hst.Variant title="Modal">
		<div
			class="modal-wrapper"
			test-id="wrapper">
			<Modal
				bind:this={modal}
				bind:size
				bind:visible
				on:open={modalOpened}
				on:in={modalIn}
				on:out={modalOut}
				on:close={close}
				{title}
				{subtitle}
				{fullscreen}
				{overlay}>
				<p slot="header">Some header content</p>

				<svelte:fragment slot="body">
					An example paragraph text
				</svelte:fragment>

				<svelte:fragment slot="footer">
					<ul class="sp-modal--footer">
						<li><a href="/">Home</a></li>
						<li><a href="/docs">Docs</a></li>
					</ul>
				</svelte:fragment>
			</Modal>
			There are many variations of passages of Lorem Ipsum available, but the
			majority have suffered alteration in some form, by injected humour, or
			randomized words which don't look even slightly believable. If you are
			going to use a passage of Lorem Ipsum, you need to be sure there isn't
			anything embarrassing hidden in the middle of text. All the Lorem Ipsum
			generators on the Internet tend to repeat predefined chunks as necessary,
			making this the first true generator on the Internet. It uses a dictionary
			of over 200 Latin words, combined with a handful of model sentence structures,
			to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
			is therefore always free from repetition, injected humour, or non-characteristic
			words etc.
			<div class="button-for-tests">
				<Button on:click={launchModal}>Launch modal</Button>
			</div>
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.modal-wrapper {
		position: static;
		width: 700px;
		height: 700px;
		background-color: blueviolet;
		z-index: 1;
	}
	.button-for-tests {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
