<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import { Checkbox, Radio, Dropdown, TextInput } from '../';

	const dispatchResponse = createEventDispatcher<{
		response: MultipleChoiceValue[];
	}>();

	export let id: string;
	export let labels: MultipleChoiceProperties['labels'] = [];
	export let multi: MultipleChoiceProperties['multi'];
	export let layout: MultipleChoiceProperties['layout'] = '1';
	export let random: MultipleChoiceProperties['random'] = false;
	export let other: MultipleChoiceProperties['other'] = 'Other';
	// export let min: MultipleChoiceProperties['min'];
	// export let max: MultipleChoiceProperties['max'];

	export let response: MultipleChoiceValue[] = [];

	$: if (random) {
		labels = labels.sort(() => Math.random() - 0.5);
	}
	$: otherTextValue = '';
	let otherChecked = false;
	const updateResponse = (value: MultipleChoiceValue, remove = false) => {
		// remove value if already exits.
		if (multi) {
			response = response?.filter((val) => val.label !== value.label);
		} else {
			response = [];
		}

		// just remove the value when the image is unselected.
		if (remove) {
			return;
		}

		response.push(value);
	};

	const inputChangeHandler = (event: CustomEvent) => {
		otherChecked = false;
		const target = event.detail.target as HTMLInputElement;
		const value = {
			label: target.value,
			value: true,
		} as MultipleChoiceValue;
		updateResponse(value, !target.checked);
		dispatchResponse('response', response);
	};

	const otherChangeHandler = (event: CustomEvent) => {
		const target = event.detail.target as HTMLInputElement;
		const value = {
			label: target.value,
			value: otherTextValue,
		} as MultipleChoiceValue;
		(
			document.querySelector(`#${id + '-text-input'}`) as HTMLInputElement
		)?.focus();
		updateResponse(value, !target.checked);
		dispatchResponse('response', response);
	};

	const otherTextInputHandler = (event: CustomEvent) => {
		otherTextValue = event.detail.target.value;
		if (otherTextValue && otherTextValue.length && !otherChecked) {
			otherChecked = true;
		}
		updateResponse(
			{
				label: other,
				value: otherTextValue,
			} as MultipleChoiceValue,
			!otherTextValue.length
		);
		dispatchResponse('response', response);
	};

	const dropdownChangeHandler = (event: CustomEvent) => {
		const value = {
			label: event.detail,
			value: true,
		} as MultipleChoiceValue;
		updateResponse(value);
		dispatchResponse('response', response);
	};

	const getDropdownOption = (label: string) => {
		const selected = response.some(
			(val) => val.label === label && val.value
		);
		return {
			label: label,
			id: label,
			selected: selected,
		};
	};
</script>

<form
	class="sp-survey--question--form--multiple-choice sp-survey--question--form--multiple-choice--layout-{layout}">
	{#if layout === 'dropdown'}
		<Dropdown
			options={labels.map(getDropdownOption)}
			on:change={dropdownChangeHandler} />
	{:else}
		{#each labels as label}
			<div>
				<svelte:component
					this={multi ? Checkbox : Radio}
					name={id}
					value={label}
					{label}
					size="large"
					on:change={inputChangeHandler} />
			</div>
		{/each}
		{#if other}
			<div class="sp-survey--question--form--multiple-choice-other">
				<svelte:component
					this={multi ? Checkbox : Radio}
					name={id}
					value={other}
					label={other}
					checked={otherChecked}
					{other}
					size="large"
					on:change={otherChangeHandler} />
				<TextInput
					name={id}
					id={id + '-text-input'}
					placeholder={other}
					size="large"
					on:change={otherTextInputHandler} />
			</div>
		{/if}
	{/if}
</form>
