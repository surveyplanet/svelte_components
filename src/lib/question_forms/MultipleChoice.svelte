<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type MultipleChoiceProps = HTMLAttributes<HTMLFormElement> & {
		id: string;
		labels: MultipleChoiceProperties['labels'];
		multi?: MultipleChoiceProperties['multi'];
		layout?: MultipleChoiceProperties['layout'];
		random?: MultipleChoiceProperties['random'];
		other?: MultipleChoiceProperties['other'];
		response?: MultipleChoiceValue[];
		onMultipleChoiceResponse?: (
			event: ComponentEvent<MultipleChoiceValue[]>
		) => void;
	};
</script>

<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { Checkbox, Radio, Dropdown, TextInput, ComponentEvent } from '../';

	// export let min: MultipleChoiceProperties['min'];
	// export let max: MultipleChoiceProperties['max'];

	let {
		id,
		labels,
		multi,
		layout = '1', // the default layout
		random,
		other,
		response = [], // forms return empty array if no response
		onMultipleChoiceResponse,
		...attr
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

	const inputChangeHandler = (event: ComponentEvent<boolean>) => {
		otherChecked = false;
		const target = event.target as HTMLInputElement;
		const value: MultipleChoiceValue = {
			label: target.value,
			value: true,
		};
		updateResponse(value, !target.checked);
		if (typeof onMultipleChoiceResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				target,
				event.raw
			);
			onMultipleChoiceResponse(componentEvent);
		}
	};

	const otherChangeHandler = (event: ComponentEvent<boolean>) => {
		const target = event.target as HTMLInputElement;
		const value: MultipleChoiceValue = {
			label: target.value,
			value: otherTextValue,
		};
		(
			document.querySelector(`#${id + '-text-input'}`) as HTMLInputElement
		)?.focus();
		updateResponse(value, !target.checked);
		if (typeof onMultipleChoiceResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				target,
				event.raw
			);
			onMultipleChoiceResponse(componentEvent);
		}
	};

	const otherTextInputHandler = (
		event: ComponentEvent<string> | ComponentEvent<undefined>
	) => {
		otherTextValue = (event.target as HTMLInputElement).value; // this might no longer work
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
		if (typeof onMultipleChoiceResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target,
				event.raw
			);
			onMultipleChoiceResponse(componentEvent);
		}
	};

	const dropdownChangeHandler = (event: ComponentEvent<string>) => {
		const value = {
			label: event.value,
			value: true,
		} as MultipleChoiceValue;
		updateResponse(value);
		if (typeof onMultipleChoiceResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target,
				event.raw
			);
			onMultipleChoiceResponse(componentEvent);
		}
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
	{...attr}
	class="sp-survey--question--form--multiple-choice sp-survey--question--form--multiple-choice--layout-{layout}">
	{#if layout === 'dropdown'}
		<Dropdown
			options={labels.map(getDropdownOption)}
			onDropdownChange={dropdownChangeHandler} />
	{:else}
		<!-- {@const callbacks = multi ? { onCheckboxChange: inputChangeHandler } : { onRadioChange: inputChangeHandler }} -->
		{#each labels as label}
			<div>
				<svelte:component
					this={multi ? Checkbox : Radio}
					name={id}
					value={label}
					{label}
					size="large"
					block={true}
					onRadioChange={inputChangeHandler}
					onCheckboxChange={inputChangeHandler} />
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
					onRadioChange={otherChangeHandler}
					onCheckboxChange={otherChangeHandler} />
				<TextInput
					placeholder={other}
					size="large"
					onTextInputInput={otherTextInputHandler}
					onTextInputBlur={otherTextInputHandler} />
			</div>
		{/if}
	{/if}
</form>
