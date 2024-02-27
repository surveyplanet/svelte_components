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
		min?: MultipleChoiceProperties['min'];
		max?: MultipleChoiceProperties['max'];
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
	import { delay } from '@surveyplanet/utilities';
	// export let min: MultipleChoiceProperties['min'];
	// export let max: MultipleChoiceProperties['max'];

	let {
		labels,
		multi,
		layout = '1',
		random,
		other,
		min,
		max,
		response = [],
		onMultipleChoiceResponse,
		...attr
	} = $props<MultipleChoiceProps>();

	let group: string[] | string | undefined = $state();
	let otherValue: string | undefined = $state();
	let otherIsSelected: boolean = $derived(
		typeof other !== 'undefined' &&
			other?.length > 0 &&
			response.some((val) => val.label === other)
	);

	let otherInputEl: HTMLInputElement | undefined = $state();

	$effect.pre(() => {
		if (random) {
			labels = labels.sort(() => Math.random() - 0.5);
		}
	});

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

	const getCheckRadioData = () => {
		const res = labels.map((label) => {
			return {
				id: label,
				value: label,
				label: label,
			};
		});

		if (other?.length) {
			res.push({
				id: other,
				value: other,
				label: other,
			});
		}

		return res;
	};

	const updateResponse = async (
		event: ComponentEvent<string | string[] | undefined>
	) => {
		await delay(); // wait one cycle of event loop for 'group' to update

		if (Array.isArray(group) && group.length) {
			response = group.map((val) => {
				let value = val === other ? other : true;
				return {
					label: val,
					value,
				};
			});
		} else if (
			Object.prototype.toString.call(group) === '[object String]' &&
			group?.length
		) {
			let value =
				group === other && otherValue?.length ? otherValue : true;
			response = [
				{
					label: group as string,
					value,
				},
			];
		} else {
			response = [];
		}

		if (response.length > 0) {
			if (typeof min === 'number' && response.length < min) {
				// TODO: show error message
			}

			if (typeof max === 'number' && response.length > max) {
				// TODO: show error message
			}
		}

		if (typeof onMultipleChoiceResponse === 'function') {
			onMultipleChoiceResponse(
				new ComponentEvent<MultipleChoiceValue[]>(
					response,
					undefined,
					event.raw
				)
			);
		}
	};

	const radioChangeHandler = (event: ComponentEvent<string>) => {
		updateResponse(event);
	};
	const checkboxChangeHandler = (event: ComponentEvent<string[]>) => {
		updateResponse(event);
	};

	const otherTextInputHandler = (
		event: ComponentEvent<string | undefined>
	) => {
		updateResponse(event);
	};

	const dropdownChangeHandler = (event: ComponentEvent<string>) => {
		group = event.value;
		updateResponse(event);
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
		<div>
			<svelte:component
				this={multi ? Checkbox : Radio}
				bind:group
				data={getCheckRadioData()}
				size="large"
				block={true}
				onRadioChange={radioChangeHandler}
				onCheckboxChange={checkboxChangeHandler} />
		</div>

		{#if other?.length}
			<div class="sp-survey--question--form--multiple-choice-other">
				<TextInput
					bind:value={otherValue}
					placeholder={other}
					disabled={otherIsSelected}
					size="large"
					onTextInputInput={otherTextInputHandler} />
			</div>
		{/if}
	{/if}
</form>
