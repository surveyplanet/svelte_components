<script lang="ts">
	import type { EssayValue, EssayProperties } from '@surveyplanet/types';
	import { TextInput } from '../';
	import { createEventDispatcher } from 'svelte';

	const dispatchUpdate = createEventDispatcher<{ update: EssayValue[] }>();
	const dispatchInvalid = createEventDispatcher<{ invalid: boolean }>();

	export let id: string;
	export let min: EssayProperties['min'];
	export let max: EssayProperties['max'];
	export let single: EssayProperties['single'] = false;
	export let response: EssayValue[];

	const updateResponse = (value: string) => {
		response = [value];

		if (typeof min !== 'undefined' && value.length < min) {
			return dispatchInvalid('invalid', true);
		}

		if (typeof max !== 'undefined' && value.length > max) {
			return dispatchInvalid('invalid', true);
		}
	};

	const inputKeyupHandler = ({ detail }: CustomEvent['detail']) => {
		updateResponse(detail.target.value);
		dispatchUpdate('update', response);
	};
</script>

<form class="sp-survey--question--essay--form">
	<TextInput
		name="text-input"
		type="text"
		id={`${id}-essay`}
		multiline={!single}
		value={response?.length ? response[0] : ''}
		on:keyup={inputKeyupHandler} />
	<!-- TODO: add Min/Max labels -->
</form>
