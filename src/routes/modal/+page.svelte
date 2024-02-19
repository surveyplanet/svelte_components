<script lang="ts">
	import { Modal, Button } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<Event[]>([]);

	let title = $state('Modal');
	let subtitle = $state('Subtitle');
	let fullscreen = $state(false);
	let overlay = $state(true);
	let visible = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('medium');

	const onModalIntroStart = (event: Event): void => {
		events.push(event);
	};

	const onModalIntroEnd = (event: Event): void => {
		events.push(event);
	};

	const onModalOutroStart = (event: Event): void => {
		events.push(event);
	};

	const onModalOutroEnd = (event: Event) => {
		events.push(event);
	};
</script>

<Layout
	component="Modal"
	example={source({ title, subtitle, fullscreen, overlay, visible, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Title"
			bind:value={title} />
		<PropsChanger
			label="Subtitle"
			bind:value={subtitle} />
		<PropsChanger
			label="Fullscreen"
			bind:value={fullscreen} />
		<PropsChanger
			label="Overlay"
			bind:value={overlay} />
		<PropsChanger
			label="Visible"
			type="boolean"
			bind:value={visible} />
		<PropsChanger
			label="Size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<Modal
			bind:visible
			{size}
			{onModalIntroStart}
			{onModalIntroEnd}
			{onModalOutroStart}
			{onModalOutroEnd}
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
				onButtonClick={() => {
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
