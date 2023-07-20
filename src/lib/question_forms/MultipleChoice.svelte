<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import { Checkbox, Radio, Dropdown } from '../';

	const dispatchResponse = createEventDispatcher<{
		response: MultipleChoiceValue[];
	}>();

	export let id: string;
	export let labels: MultipleChoiceProperties['labels'] = [];
	export let multi: MultipleChoiceProperties['multi'];
	export let layout: MultipleChoiceProperties['layout'] = '1';
	export let random: MultipleChoiceProperties['random'] = false;
	export let min: MultipleChoiceProperties['min'];
	export let max: MultipleChoiceProperties['max'];

	export let response: MultipleChoiceValue[] = [];

	if (random) {
		labels = labels.sort(() => Math.random() - 0.5);
	}

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
		const target = event.detail.target as HTMLInputElement;
		const value = {
			label: target.value,
			value: true, // this needs to change to the write-in value if it exists.
		} as MultipleChoiceValue;
		updateResponse(value, !target.checked);
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
	class="sp-survey--question--mutliple-choice--form sp-survey--question--mutliple-choice--layout-{layout}">
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
	{/if}
</form>
