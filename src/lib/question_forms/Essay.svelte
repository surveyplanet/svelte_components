<script lang="ts">
	import type { EssayValue, EssayProperties } from '@surveyplanet/types';
	import { TextInput } from '../';
	import { createEventDispatcher } from 'svelte';

	const dispatchResponse = createEventDispatcher<{
		response: EssayValue[];
	}>();

	export let id: string;
	export let min: EssayProperties['min'];
	export let max: EssayProperties['max'];
	export let single: EssayProperties['single'] = false;
	export let response: EssayValue[];

	const updateResponse = (value: string) => {
		response = [value];
	};

	const inputKeyupHandler = ({ detail }: CustomEvent['detail']) => {
		updateResponse(detail.target.value);
		dispatchResponse('response', response);
	};
</script>

<form class="sp-survey--question--form--essay">
	<TextInput
		name="text-input"
		type="text"
		id={`${id}-essay`}
		multiline={!single}
		value={response?.length ? response[0] : ''}
		on:keyup={inputKeyupHandler} />

	{#if min ?? max}
		<div class="sp-survey--question--form--essay--counters">
			{#if min}
				<span class="sp-survey--question--form--essay--counter-min">
					{min}
				</span>
			{/if}
			{#if max}
				<span class="sp-survey--question--form--essay--counter-max">
					{max}
				</span>
			{/if}
		</div>
	{/if}
</form>
