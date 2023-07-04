<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ProgressBar, Button } from '../../lib/index';
	import { menuData } from '../menu/menu_data';

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
		if (index < questions.length - 1) {
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
		<Button on:click={nextButtonClickHandler}>Next</Button>
	</Hst.Variant>
</Hst.Story>
