<script lang="ts">
	import { Radio } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	export let Hst;

	let bgColor: string | null;
	let textColor: string | null;
	let content = 'Pro';

	const source = `<Radio {bgColor} {textColor}>{content}</Radio>`;
</script>

<Hst.Story title="Radio">
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
		<Radio
			{bgColor}
			{textColor}>{content}</Radio>
	</Hst.Variant>
</Hst.Story>
