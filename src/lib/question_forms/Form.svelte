<script
	lang="ts"
	context="module">
	export type FormProps = {
		id: string;
		labels: FormProperties['labels'];
		random?: FormProperties['random'];
		response?: FormValue[];
		formResponse: (value: FormValue[]) => void;
	};
</script>

<script lang="ts">
	import type { FormValue, FormProperties } from '@surveyplanet/types';
	import { TextInput } from '../';

	// export let validations: FormProperties['validations'];
	// export let requireAll: FormProperties['requireAll'];

	let {
		id,
		labels,
		random,
		response = [],
		formResponse,
	} = $props<FormProps>();

	if (random) {
		labels = labels.sort(() => Math.random() - 0.5);
	}
	const updateResponse = (value: FormValue) => {
		// remove value if already exits.
		response = response?.filter((v) => v.label !== value.label);
		response?.push(value);
	};

	const inputChangeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const value = {
			label: target.name,
			value: target.value,
		} as FormValue;
		updateResponse(value);
		formResponse(response);
	};

	const inputKeyupHandler = inputChangeHandler;
</script>

<form class="sp-survey--question--form--form">
	{#each labels as label}
		<TextInput
			name={label}
			{label}
			type="text"
			id={`${id}-${label.toLocaleLowerCase()}`}
			size="large"
			onchange={inputChangeHandler}
			onkeyup={inputKeyupHandler} />
	{/each}
</form>
