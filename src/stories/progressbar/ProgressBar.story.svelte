<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ProgressBar, Button } from '../../lib/index';

	export let Hst: Histoire;

	let questions = [
		{
			question: 'What is your name?',
			answer: 'John Doe',
		},
		{
			question: 'What is your age?',
			answer: '21',
		},
		{
			question: 'What is your favorite color?',
			answer: 'Blue',
		},
	];

	$: index = 0;

	const nextButtonClickHandler = () => {
		if (index < questions.length) {
			index += 1;
		} else {
			index = 0;
		}

		logEvent('next-button-clicked', {
			index,
			question: questions[index].question,
		});
	};
</script>

<Hst.Story title="ProgressBar">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={questions}
			title="Data" />
	</svelte:fragment>

	<Hst.Variant title="ProgressBar">
		<ProgressBar
			{questions}
			{index} />
		<div class="wrapper">
			<Button on:click={nextButtonClickHandler}>Next</Button>
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.wrapper {
		display: flex;
		justify-content: left;
		align-items: center;
		margin-top: 100px;
	}
</style>
