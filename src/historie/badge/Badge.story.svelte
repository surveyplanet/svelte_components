<script lang="ts">
	import { Badge } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	export let Hst;

	let bgColor = COLORS.yellow;
	let textColor = COLORS.black;
	let content = 'Pro';

	const source = `<Badge {bgColor} {textColor}>{content}</Badge>`;
</script>

<Hst.Story title="Badge">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={content}
			title="Content" />

		<!-- TODO: add some tailwind classes here so they look nicer -->
		<label
			for="badge-background-color"
			class="histoire-wrapper htw-p-2 hover:htw-bg-primary-100 dark:hover:htw-bg-primary-800 htw-flex htw-gap-2 htw-flex-wrap histoire-text htw-cursor-text htw-items-center"
			>Background color
			<input
				type="color"
				id="badge-background-color"
				bind:value={bgColor} />
		</label>

		<label
			for="badge-text-color"
			class="histoire-wrapper htw-p-2 hover:htw-bg-primary-100 dark:hover:htw-bg-primary-800 htw-flex htw-gap-2 htw-flex-wrap histoire-text htw-cursor-text htw-items-center"
			>Text color
			<input
				type="color"
				id="badge-text-color"
				bind:value={textColor} />
		</label>
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<div class="wrapper">
			<Badge
				{bgColor}
				{textColor}>{content}</Badge>
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.wrapper {
		width: 50%;
		background-color: $color--light-purple-light;
		border-radius: $size-radius--small;
		padding: $size-gutter--half;
	}
	input[type='color'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 35px;
		height: 35px;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	input[type='color']::-webkit-color-swatch {
		border-radius: 3px;
		border: none;
	}
	input[type='color']::-moz-color-swatch {
		border-radius: 3px;
		border: none;
	}
</style>
