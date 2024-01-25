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
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="Title"
				value={title}
				oninput={(e: Event) => {
					title = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Subtitle"
				value={subtitle}
				oninput={(e: Event) => {
					subtitle = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				boolean="Fullscreen"
				value={fullscreen}
				oninput={(e: Event) => {
					fullscreen = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Overlay"
				value={overlay}
				oninput={(e: Event) => {
					overlay = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Visible"
				value={visible}
				oninput={(e: Event) => {
					visible = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				select="Size"
				value={size}
				selectOptions={['small', 'medium', 'large']}
				oninput={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Modal
			{visible}
			{size}
			onintrostart={modalOpened}
			onintroend={modalIn}
			onoutrostart={modalOut}
			onoutroend={close}
			{title}
			{subtitle}
			{fullscreen}
			{overlay}>
			{#snippet header()}
				<p>
					Hall low lands den womans control the or. Might he which
					forgot she he him, if below isle where brow.
				</p>
			{/snippet}
			{#snippet body()}
				And visit not than sacred cell wins in not childe. Fabled most
				heart charms een feeble. Had his flatterers yes nor, from from
				cell soon once upon beyond so then, sore from dome condole was
				favour departed friend from moths.
			{/snippet}

			{#snippet footer()}
				<p>&copy; Surveyplanet</p>
			{/snippet}
		</Modal>
		<div class="button-for-tests">
			<Button
				onclick={() => {
					visible = true;
				}}>Launch modal</Button>
		</div>
	{/snippet}
</Layout>

<style>
	.button-for-tests {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
