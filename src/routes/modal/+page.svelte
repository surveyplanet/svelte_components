<script lang="ts">
	import { Modal, Button } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let title = $state('Modal');
	let subtitle = $state('Subtitle');
	let fullscreen = $state(false);
	let overlay = $state(true);
	let visible = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('medium');

	const modalOpened = (e: Event): void => {
		events.push('open');
	};

	const modalIn = (e: Event): void => {
		events.push('in');
	};

	const modalOut = (e: Event): void => {
		events.push('out');
	};

	const close = (e: Event) => {
		events.push('close');
	};
</script>

<Layout
	component="Modal"
	example={source(title, subtitle, fullscreen, overlay, visible, size)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Title"
				value={title}
				textInputHandler={(e: Event) => {
					title = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Subtitle"
				value={subtitle}
				textInputHandler={(e: Event) => {
					subtitle = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Fullscreen"
				value={fullscreen.toString()}
				textInputHandler={(e: Event) => {
					fullscreen = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Overlay"
				value={overlay.toString()}
				textInputHandler={(e: Event) => {
					overlay = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Visible"
				value={visible.toString()}
				textInputHandler={(e: Event) => {
					visible = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Size"
				value={size}
				textInputHandler={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Modal
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
	</svelte:fragment>
</Layout>

<style>
	.button-for-tests {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
