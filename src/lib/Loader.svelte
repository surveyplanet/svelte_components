<script lang="ts">
	import { onMount } from 'svelte';
	import { COLORS } from './_definitions';

	const strokeDashOffset = 63;

	export let colors = [COLORS.yellow, COLORS.blue, COLORS.pink, COLORS.green];
	export let size = 72;
	export let strokeWidth: 1 | 2 | 3 | 4 = 4; // stroke width doesn't look good above 4

	// When updating the colors the animation can get out of sync since the
	// speed is based on the number of colors. This should be fine as long as the
	// colors don't change after initialization. This could be an issue using it
	// in a single page app.
	$: speed = colors.length;

	// keyframes can not be applied to svg element directly so inject in to head
	function injectKeyframes() {
		const keyframeElId = 'sp-loader--animation-keyframes';
		let keyframeEl = document.getElementById(keyframeElId);
		if (keyframeEl === undefined || keyframeEl === null) {
			keyframeEl = document.createElement('style');
			keyframeEl.id = keyframeElId;
		}

		const keyframe = Math.round((1 / (colors.length * 2)) * 100);
		keyframeEl.textContent = `@keyframes loader-stroke {
	${keyframe}% { stroke-dashoffset: 0 } ${keyframe * 2}%,
	100% { stroke-dashoffset: ${strokeDashOffset} } 
}`;
		document.head.appendChild(keyframeEl);
	}

	onMount(() => {
		injectKeyframes();
	});
</script>

<svg
	class="sp-loader sp-loader--{size}"
	viewBox="0 0 24 24"
	style:width="{size}px"
	style:height="{size}px">
	{#each colors as color, index}
		<circle
			class="sp-loader--track"
			cx="12"
			cy="12"
			r="10"
			stroke-width={strokeWidth}
			stroke={color}
			style:animation-duration="{speed}s"
			style:stroke-dasharray={strokeDashOffset}
			style:stroke-dashoffset={strokeDashOffset}
			style:animation-delay="{index + 1}s" />
	{/each}
</svg>
