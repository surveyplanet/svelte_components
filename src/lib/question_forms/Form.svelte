<script lang="ts">
	import type { FormValue, FormProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import { TextInput } from '../';

	const dispatchResponse = createEventDispatcher<{ response: FormValue[] }>();

	export let id: string;
	export let labels: FormProperties['labels'] = [];
	// export let validations: FormProperties['validations'];
	// export let requireAll: FormProperties['requireAll'];
	export let random: FormProperties['random'];
	export let response: FormValue[] = [];

	$: if (random) {
		labels = labels.sort(() => Math.random() - 0.5);
	}
	const updateResponse = (value: FormValue) => {
		// remove value if already exits.
		response = response?.filter((v) => v.label !== value.label);
		response?.push(value);
	};

	const inputChangeHandler = ({ detail }: CustomEvent['detail']) => {
		const { target } = detail;
		const value = {
			label: target.name,
			value: target.value,
		} as FormValue;
		updateResponse(value);
		dispatchResponse('response', response);
	};

	const inputKeyupHandler = inputChangeHandler;
</script>

<form class="sp-survey--question--form--form">
	{#each labels as label}
		<TextInput
			name={label}
			{label}
			id={`${id}-${label.toLocaleLowerCase()}`}
			size="large"
			on:change={inputChangeHandler}
			on:keyup={inputKeyupHandler} />
	{/each}
</form>
