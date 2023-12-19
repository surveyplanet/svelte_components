<script lang="ts">
	export let max = 0;
	export let value = 0;
	export let speed = 1000; // milliseconds
	export let displayValue = true;

	let progress = 0;

	$: {
		if (value > max) value = max;
		if (value < 0) value = 0;
		progress = (value / max) * 100;
	}
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
