<script lang="ts">
	export let max = 0;
	export let value = 0;

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
		style="width: {progress}%" />
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-progress-bar {
		width: 100%;
		height: $size--6;
		margin: 0 auto;
		border-radius: $size--6;
		background: $color--beige-darker;
	}

	.sp-progress-bar--progress {
		height: 100%;
		border-radius: $size--6;
		background: $color--green;
	}
</style>
