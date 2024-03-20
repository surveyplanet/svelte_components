<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type FormProps = HTMLAttributes<HTMLFormElement> & {
		labels: FormProperties['labels'];
		random?: FormProperties['random'];
		response?: FormValue[];
		onFormResponse?: (
			event: ComponentEvent<FormValue[], HTMLInputElement>
		) => void;
	};
</script>

<script lang="ts">
	import type { FormValue, FormProperties } from '@surveyplanet/types';
	import { ComponentEvent, TextInput } from '../';

	// export let validations: FormProperties['validations'];
	// export let requireAll: FormProperties['requireAll'];

	let {
		labels,
		random,
		response = [], // forms return empty array if no response
		onFormResponse,
		...attr
	} = $props<FormProps>();

	if (random) {
		labels = labels.sort(() => Math.random() - 0.5);
	}
	const updateResponse = (value: FormValue) => {
		// remove value if already exits.
		response = response?.filter((v) => v.label !== value.label);
		response?.push(value);
	};

	const inputChangeHandler = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		const target = event.target as HTMLInputElement;
		const value: FormValue = {
			label: target.name,
			value: target.value,
		};
		updateResponse(value);
		if (onFormResponse) {
			const componentEvent = new ComponentEvent(
				response,
				target,
				event.raw
			);
			onFormResponse(componentEvent);
		}
	};

	const inputKeyupHandler = inputChangeHandler;
</script>

<form
	{...attr}
	class="sp-survey--question--form--form">
	{#each labels as label}
		<TextInput
			id={`${(Date.now() + Math.random()).toString(36)}`}
			name={label}
			{label}
			type="text"
			size="large"
			onTextInputChange={inputChangeHandler}
			onTextInputKeyup={inputKeyupHandler} />
	{/each}
</form>
