<script
	lang="ts"
	context="module">
	export type EssayProps = {
		id: string;
		min: EssayProperties['min'];
		max: EssayProperties['max'];
		single: EssayProperties['single'];
		response: EssayValue[];
		onEssayResponse: (response: EssayValue[]) => void;
	};
</script>

<script lang="ts">
	import type { EssayValue, EssayProperties } from '@surveyplanet/types';
	import { TextInput } from '../';

	let {
		id,
		min,
		max,
		single,
		response = [],
		onEssayResponse,
	} = $props<EssayProps>();

	const updateResponse = (value: string) => {
		response = [value];
	};

	const inputKeyupHandler = (event: Event) => {
		updateResponse((event.target as HTMLInputElement)?.value);
		onEssayResponse(response);
	};
</script>

<form class="sp-survey--question--form--essay">
	<TextInput
		name="text-input"
		type={single ? 'text' : 'multiline'}
		id={`${id}-essay`}
		value={response?.length ? response[0] : ''}
		onTextInputKeyup={inputKeyupHandler} />

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
