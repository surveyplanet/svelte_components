<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type EssayProps = HTMLAttributes<HTMLFormElement> & {
		id?: string;
		min?: EssayProperties['min'];
		max?: EssayProperties['max'];
		single?: EssayProperties['single'];
		response?: EssayValue[];
		onEssayResponse?: (event: ComponentEvent<EssayValue[]>) => void;
	};
</script>

<script lang="ts">
	import type { EssayValue, EssayProperties } from '@surveyplanet/types';
	import { ComponentEvent, TextInput } from '../';

	let {
		id,
		min,
		max,
		single,
		response = [], // forms return empty array if no response
		onEssayResponse,
		...attr
	} = $props<EssayProps>();

	const updateResponse = (value: string) => {
		response = [value];
	};

	const inputKeyupHandler = (event: ComponentEvent<string>) => {
		updateResponse((event.target as HTMLInputElement)?.value);
		if (typeof onEssayResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target!,
				event.raw
			);
			onEssayResponse(componentEvent);
		}
	};
</script>

<form
	{...attr}
	class="sp-survey--question--form--essay">
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
