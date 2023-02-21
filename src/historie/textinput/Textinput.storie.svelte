<script lang="ts">
	import { TextInput } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	export let Hst;

	let bgColor: string | null;
	let textColor: string | null;
	let content = 'Pro';

	const source = `<TextInput {bgColor} {textColor}>{content}</TextInput>`;
</script>

<Hst.Story title="TextInput/TextInput">
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
		<TextInput
			{bgColor}
			{textColor}>{content}</TextInput>
	</Hst.Variant>
</Hst.Story>
