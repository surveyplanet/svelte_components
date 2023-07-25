<script lang="ts">
	import { Badge } from '$lib';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { COLORS } from '$lib/_definitions';
	export let Hst: Histoire;

	let color: 'yellow' | 'blue' | 'pink' | 'green' = 'yellow';
	let content = 'Pro';
	let flat = false;

	const source = `<Badge color>{content}</Badge>`;
</script>

<Hst.Story title="Badge">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={color}
			title="Color"
			options={[
				{ label: 'Yellow', value: 'yellow' },
				{ label: 'Blue', value: 'blue' },
				{ label: 'Pink', value: 'pink' },
				{ label: 'Green', value: 'green' },
			]} />

		<Hst.Text
			bind:value={content}
			title="Content" />

		<Hst.Checkbox
			bind:value={flat}
			title="Flat" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<div class="wrapper">
			<Badge
				{color}
				{flat}>{content}</Badge>
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.wrapper {
		background-color: $color--beige;
		border-radius: $size-radius--small;
	}
</style>
