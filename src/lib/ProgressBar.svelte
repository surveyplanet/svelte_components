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

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-progress-bar {
		width: 100%;
		height: $size--6;
		margin: 0 auto;
		border-radius: $size--6;
		background: $color--beige-darker;
		display: flex;
		transition-duration: 0.5s;
		transition-timing-function: ease-out;
		&:hover {
			height: 15px;
			visibility: visible;

			.sp-progress-bar--value {
				opacity: 1;
			}
		}
	}

	.sp-progress-bar--progress {
		height: 100%;
		border-radius: $size--6;
		background: $color--green;
		transition-property: width;
		transition-timing-function: ease-out;
	}

	.sp-progress-bar--value {
		opacity: 0;
		position: absolute;
		width: 20px;
		height: 20px;
		transform: translateY(55%);
	}
</style>
