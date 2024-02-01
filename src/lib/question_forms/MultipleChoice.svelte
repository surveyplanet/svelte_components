<script
	lang="ts"
	context="module">
	export type MultipleChoiceProps = {
		id: string;
		labels: MultipleChoiceProperties['labels'];
		multi: MultipleChoiceProperties['multi'];
		layout?: MultipleChoiceProperties['layout'];
		random?: MultipleChoiceProperties['random'];
		other?: MultipleChoiceProperties['other'];
		response?: MultipleChoiceValue[];
		onMultipleChoiceResponse: (response: MultipleChoiceValue[]) => void;
	};
</script>

<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import type { DropdownOptions } from '$lib/Dropdown.svelte';
	import { Checkbox, Radio, Dropdown, TextInput } from '../';

	// export let min: MultipleChoiceProperties['min'];
	// export let max: MultipleChoiceProperties['max'];

	let {
		id,
		labels,
		multi,
		layout = '1',
		random = false,
		other = 'Other',
		response = [],
		onMultipleChoiceResponse,
	} = $props<MultipleChoiceProps>();

	$effect(() => {
		if (random) {
			labels = labels.sort(() => Math.random() - 0.5);
		}
	});

	let otherTextValue = $state('');
	let otherChecked = $state(false);
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

	const inputChangeHandler = (event: Event) => {
		otherChecked = false;
		const target = event.target as HTMLInputElement;
		const value: MultipleChoiceValue = {
			label: target.value,
			value: true,
		};
		updateResponse(value, !target.checked);
		onMultipleChoiceResponse(response);
	};

	const otherChangeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const value: MultipleChoiceValue = {
			label: target.value,
			value: otherTextValue,
		};
		(
			document.querySelector(`#${id + '-text-input'}`) as HTMLInputElement
		)?.focus();
		updateResponse(value, !target.checked);
		onMultipleChoiceResponse(response);
	};

	const otherTextInputHandler = (event: Event) => {
		otherTextValue = (event.target as HTMLInputElement).value;
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
		onMultipleChoiceResponse(response);
	};

	const dropdownChangeHandler = (label: DropdownOptions['id']) => {
		const value = {
			label: label,
			value: true,
		} as MultipleChoiceValue;
		updateResponse(value);
		onMultipleChoiceResponse(response);
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
			onchange={dropdownChangeHandler} />
	{:else}
		{#each labels as label}
			<div>
				<svelte:component
					this={multi ? Checkbox : Radio}
					name={id}
					value={label}
					{label}
					size="large"
					onchange={inputChangeHandler} />
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
					size="large"
					onchange={otherChangeHandler} />
				<TextInput
					name={id}
					id={id + '-text-input'}
					placeholder={other}
					size="large"
					oninput={otherTextInputHandler}
					onblur={otherTextInputHandler} />
			</div>
		{/if}
	{/if}
</form>
