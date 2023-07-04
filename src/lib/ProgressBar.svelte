<script lang="ts">
	export let index: number;
	export let questions: object[];

	const progressPercentage = (index: number, questions: object[]) => {
		return (index / questions.length) * 100;
	};

	$: progress = progressPercentage(index, questions);
</script>

<div class="sp-progress-bar">
	<div
		class="sp-progress-bar--progress"
		style="width: {progress}%" />
</div>

<style>
	.sp-progress-bar {
		width: 100%;
		height: 10px;
		position: inherit;
		margin: 0 auto;
		border-radius: 30px;
		background: var(--beige-shade-2-strokes, #ebe6d7);
	}

	.sp-progress-bar--progress {
		height: 6px;
		flex-shrink: 0;
		height: 100%;
		border-radius: 30px;
		background: var(--green, #bdffd8);
	}
</style>
