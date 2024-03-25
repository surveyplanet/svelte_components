<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
		max: number;
		value?: number;
		speed?: number;
		displayValue?: boolean;
	};
</script>

<script lang="ts">
	let {
		max,
		value = 0, // to start at 0
		speed = 1000, // speed should have a fallback value
		displayValue,
		...attr
	}: ProgressBarProps = $props();
	let progress = $state(0);

	$effect(() => {
		if (value > max) value = max;
		if (value < 0) value = 0;
		progress = (value / max) * 100;
	});
</script>

<div
	{...attr}
	class="sp-progress-bar">
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
