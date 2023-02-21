<script lang="ts">
	import { Badge } from '../../lib';
	export let Hst;

	let bgColor: string | null;
	let textColor: string | null;
	let content = 'Pro';

	const source = `<Badge {bgColor} {textColor}>{content}</Badge>`;
</script>

<Hst.Story>
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
		title="Badge component"
		{source}>
		<Badge
			{bgColor}
			{textColor}>{content}</Badge>
	</Hst.Variant>

	<Hst.Variant title="Badge component - max width">
		<div class="badge-container">
			<Badge
				{bgColor}
				{textColor}>{content}</Badge>
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.badge-container {
		background-color: blue;
		max-width: 50px;
	}
</style>
