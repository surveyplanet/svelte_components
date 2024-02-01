<script lang="ts">
	import { Modal, Button } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let title = $state('Modal');
	let subtitle = $state('Subtitle');
	let fullscreen = $state(false);
	let overlay = $state(true);
	let visible = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('medium');

	const modalOpened = (): void => {
		events.push('open');
	};

	const modalIn = (): void => {
		events.push('in');
	};

	const modalOut = (): void => {
		events.push('out');
	};

	const close = () => {
		events.push('close');
	};
</script>

<Layout
	component="Modal"
	example={source(title, subtitle, fullscreen, overlay, visible, size)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Title"
			text
			bind:value={title} />
		<PropsChanger
			label="Subtitle"
			text
			bind:value={subtitle} />
		<PropsChanger
			label="Fullscreen"
			checkbox
			bind:value={fullscreen} />
		<PropsChanger
			label="Overlay"
			bind:value={overlay}
			checkbox />
		<PropsChanger
			label="Visible"
			checkbox
			bind:value={visible} />
		<PropsChanger
			label="Size"
			select
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
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
