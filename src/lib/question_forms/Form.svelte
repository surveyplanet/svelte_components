<script
	lang="ts"
	context="module">
	export type FormProps = {
		id: string;
		labels: FormProperties['labels'];
		random?: FormProperties['random'];
		response?: FormValue[];
		onFormResponse?: (value: FormValue[]) => void;
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
		onFormResponse,
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
		const value: FormValue = {
			label: target.name,
			value: target.value,
		};
		updateResponse(value);
		if (onFormResponse) onFormResponse(response);
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
			onTextInputChange={inputChangeHandler}
			onTextInputKeyup={inputKeyupHandler} />
	{/each}
</form>
