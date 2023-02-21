<script lang="ts">
	import { Badge } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	export let Hst;

	let bgColor: string | null;
	let textColor: string | null;
	let content = 'Pro';

	const source = `<Badge {bgColor} {textColor}>{content}</Badge>`;
</script>

<Hst.Story title="Badge">
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
		<Badge
			{bgColor}
			{textColor}>{content}</Badge>
	</Hst.Variant>

	<Hst.Variant title="Overflow">
		<div
			style="max-width: 50px;height:50px; background-color: {COLORS.blue}; padding: 10px">
			<Badge
				{bgColor}
				{textColor}>Cared for memory and knew climes long finds.</Badge>
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.badge-container {
		background-color: blue;
		max-width: 50px;
	}
</style>
