<script lang="ts">
	import { Button } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	export let Hst;

	let bgColor: string | null;
	let textColor: string | null;
	let content = 'Pro';

	const source = `<Button {bgColor} {textColor}>{content}</Button>`;
</script>

<Hst.Story title="Button">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={content}
			title="Content" />

		<p>
			<label>Background color</label>
			<input
				type="color"
				bind:value={bgColor} />
		</p>
		<p>
			<label>Text color</label>
			<input
				type="color"
				bind:value={textColor} />
		</p>
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Button
			{bgColor}
			{textColor}>{content}</Button>
	</Hst.Variant>

	<Hst.Variant title="Secondary">
		<Button
			bgColor="deeppink"
			textColor="white">Inverted</Button>
	</Hst.Variant>

	<Hst.Variant title="Tertiary">
		<div
			style="max-width: 50px;height:50px; background-color: {COLORS.blue}; padding: 10px">
			<Button
				{bgColor}
				{textColor}
				>Cared for memory and knew climes long finds.</Button>
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.badge-container {
		background-color: blue;
		max-width: 50px;
	}
</style>
