<script lang="ts">
	import { onMount } from 'svelte';

	export let colors = ['#e2bd60', '#79c5e5', '#e2bd60', '#79c5e5'];
	export let size: 'small' | 'medium' | 'large' = 'medium';

	onMount(() => {
		injectKeyframes();
	});

	let loaderDuration = colors.length;

	let strokeDashOffset = 63;
	let box = 24;
	let cx = 12;
	let cy = 12;
	let r = 10;
	let strokeWidth = 4;

	if (size === 'small') {
		strokeDashOffset = 15;
		box = 12;
		cx = 6;
		cy = 6;
		r = 2;
		strokeWidth = 1;
	} else if (size === 'large') {
		strokeDashOffset = 126;
		box = 48;
		cx = 24;
		cy = 24;
		r = 15;
		strokeWidth = 8;
	}

	function injectKeyframes() {
		const keyframeElId = 'sp-loader--animation-keyframes';
		let keyframeEl = document.getElementById(keyframeElId);
		if (keyframeEl === undefined || keyframeEl === null) {
			keyframeEl = document.createElement('style');
			keyframeEl.id = keyframeElId;
		}

		const keyframe = (1 / (colors.length * 2)) * 100;
		keyframeEl.textContent = `@keyframes loader-stroke {
	${keyframe}% { stroke-dashoffset: 0 } ${keyframe * 2}%,
	100% { stroke-dashoffset: ${strokeDashOffset} } 
}`;
		document.head.appendChild(keyframeEl);
	}
</script>

<svg
	class="sp-loader"
	viewBox="0 0 {box} {box}"
	height={box}
	width={box}
	style="--loaderDuration: {loaderDuration}s; --dash: {strokeDashOffset}; ">
	{#each colors as color, index}
		<circle
			class="sp-loader--track"
			{cx}
			{cy}
			{r}
			stroke-width={strokeWidth}
			stroke={color}
			style:animation-delay="{index + 1}s" />
	{/each}
</svg>

<style>
	:root {
		--loaderDuration: 4s;
		--dash: 63;
	}
	.sp-loader {
		animation: loader-turn 1s linear infinite;
		padding: 0;
		margin: 0;
	}

	.sp-loader--track {
		animation: loader-stroke var(--loaderDuration) linear infinite;
		fill: none;
		stroke-dasharray: var(--dash);
		stroke-dashoffset: var(--dash);
		stroke-linecap: round;
	}

	@keyframes loader-turn {
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(720deg);
		}
	}
</style>
