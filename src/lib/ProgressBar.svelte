<script
	lang="ts"
	context="module">
	export type ProgressBarProps = {
		max: number;
		value: number;
		speed: number;
		displayValue?: boolean;
	};
</script>

<script lang="ts">
	let {
		max = 100,
		value = 0,
		speed = 1000, // milliseconds
		displayValue = true,
	} = $props<ProgressBarProps>();
	let progress = $state(0);

	$effect(() => {
		if (value > max) value = max;
		if (value < 0) value = 0;
		progress = (value / max) * 100;
	});
</script>

<div class="sp-progress-bar">
	<div
		class="sp-progress-bar--progress"
		style="width: {progress}%; transition-duration: {speed}ms;" />
	{#if displayValue}
		<span
			class="sp-progress-bar--value"
			style="left: {progress}%; transition-duration: {speed}ms;"
			>{value}</span>
	{/if}
</div>
