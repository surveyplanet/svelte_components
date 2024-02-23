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
			event: ComponentEvent<
				MultipleChoiceValue[],
				HTMLInputElement | HTMLButtonElement
			>
		) => void;
	};
</script>

<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import {
		Checkbox,
		Radio,
		Dropdown,
		TextInput,
		ComponentEvent,
		type RadioProps,
		type CheckboxProps,
	} from '../';

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

	const inputChangeHandler = (
		event: ComponentEvent<string | string[], HTMLInputElement>
	) => {
		otherChecked = false;
		const target = event.target as HTMLInputElement;
		console.log(event);

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

	const otherChangeHandler = (
		event: ComponentEvent<string | string[], HTMLInputElement>
	) => {
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
		event:
			| ComponentEvent<string, HTMLInputElement>
			| ComponentEvent<undefined, HTMLInputElement>
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

	const dropdownChangeHandler = (
		event: ComponentEvent<string, HTMLButtonElement>
	) => {
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
	let checkRadioData: RadioProps['data'] | CheckboxProps['data'] = labels.map(
		(label) => {
			return {
				label: label,
				value: label,
				id: (id + Math.random()).replace('.', ''),
			};
		}
	);

	let checkProps: CheckboxProps = {
		data: checkRadioData,
		group: response.map((val) => val.label),
		size: 'large' as CheckboxProps['size'],
		block: true,
	};

	let radioProps: RadioProps = {
		data: checkRadioData,
		group: response[0]?.label,
		size: 'large' as RadioProps['size'],
		block: true,
	};
	// TODO -fix 'Other' input
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
		{#if multi}
			<Checkbox
				{...checkProps}
				onCheckboxChange={inputChangeHandler} />
		{:else}
			<Radio
				{...radioProps}
				onRadioChange={inputChangeHandler} />
		{/if}

		{#if other}
			<div class="sp-survey--question--form--multiple-choice-other">
				{#if multi}
					<Checkbox
						data={[{ label: other, value: other }]}
						group={response.map((val) => val.label)}
						size="large"
						onCheckboxChange={otherChangeHandler} />
				{:else}
					<Radio
						data={[{ label: other, value: other }]}
						group={response[0]?.label}
						size="large"
						onRadioChange={otherChangeHandler} />
				{/if}

				<TextInput
					placeholder={other}
					size="large"
					onTextInputInput={otherTextInputHandler}
					onTextInputBlur={otherTextInputHandler} />
			</div>
		{/if}
	{/if}
</form>
