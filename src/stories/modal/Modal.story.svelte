<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Modal, Button, TextInput } from '../../lib';
	import source from './source';
	export let Hst: Histoire;

	let title = 'Modal';
	let subtitle = 'Subtitle';
	let fullscreen = false;
	let overlay = true;
	let visible = false;
	let size: 'small' | 'medium' | 'large' = 'medium';

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

	<Hst.Variant
		title="Modal"
		{source}>
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
			<p slot="header">
				Hall low lands den womans control the or. Might he which forgot
				she he him, if below isle where brow.
			</p>

			<svelte:fragment slot="body">
				And visit not than sacred cell wins in not childe. Fabled most
				heart charms een feeble. Had his flatterers yes nor, from from
				cell soon once upon beyond so then, sore from dome condole was
				favour departed friend from moths.
			</svelte:fragment>

			<svelte:fragment slot="footer">
				<p>&copy; Surveyplanet</p>
			</svelte:fragment>
		</Modal>
		<div class="button-for-tests">
			<Button on:click={() => (visible = true)}>Launch modal</Button>
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.button-for-tests {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
