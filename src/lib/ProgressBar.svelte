<script lang="ts">
	export let index: number;
	export let questions: object[];

	const progressPercentage = (index: number, questions: object[]) => {
		return (index / questions.length) * 100;
	};

	$: progress = progressPercentage(index, questions);
</script>

<div class="sp-survey--progress-bar--wrapper">
	<div
		class="sp-survey--progress-bar--progress"
		style="width: {progress}%" />
</div>
