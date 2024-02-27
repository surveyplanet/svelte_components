<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Language } from '@surveyplanet/types';
	import type { CustomDragEventTarget } from '$lib/SortableList.svelte';

	export interface ScoringDefinitions {
		scoringResetButton: Language['definitions']['scoringResetButton'];
	}

	export type ScoringProps = HTMLAttributes<HTMLFormElement> & {
		id?: string;
		definitions: ScoringDefinitions;
		values: ScoringProperties['values'];
		labels: ScoringProperties['labels'];
		maxLabel?: ScoringProperties['maxLabel'];
		minLabel?: ScoringProperties['minLabel'];
		requireAll?: ScoringProperties['requireAll'];
		requireUnique?: ScoringProperties['requireUnique'];
		response?: ScoringValue[];
		onScoringResponse?: (
			event: ComponentEvent<
				ScoringValue[],
				HTMLInputElement | CustomDragEventTarget | HTMLButtonElement
			>
		) => void;
	};
</script>

<script lang="ts">
	import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
	import {
		Button,
		Radio,
		ComponentEvent,
		SortableList,
		type SortListData,
		type RadioProps,
	} from '../';

	let {
		definitions,
		values,
		labels,
		maxLabel,
		minLabel,
		requireAll,
		requireUnique,
		response = [], // forms return empty array if no response
		onScoringResponse,
		...attr
	} = $props<ScoringProps>();

	const updateResponse = (value: ScoringValue) => {
		// remove value if already exits.
		response = response?.filter((val) => val.label !== value.label);
		response.push(value);
	};

	const inputChangeHandler = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		const target = event.target as HTMLInputElement;

		const value: ScoringValue = {
			label: target.name,
			value: Number(target.value),
		};

		updateResponse(value);

		if (typeof onScoringResponse === 'function') {
			const componentEvent = new ComponentEvent<
				ScoringValue[],
				HTMLInputElement
			>(response, event.target, event.raw);

			onScoringResponse(componentEvent);
		}
	};

	const sortableEventHandler = (
		event: ComponentEvent<SortListData[], CustomDragEventTarget>
	) => {
		const list = event.value!;
		for (let i = 0; i < list.length; i++) {
			response = response?.filter((val) => val.label !== list[i].label);
			response.push({
				label: list[i].label,
				value: values[i],
			});
		}
		if (typeof onScoringResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target as CustomDragEventTarget,
				event.raw
			);
			onScoringResponse(componentEvent);
		}
	};

	const clearButtonClickHandler = (
		event: ComponentEvent<unknown, HTMLButtonElement>
	) => {
		response = [];
		if (typeof onScoringResponse === 'function') {
			const componentEvent = new ComponentEvent(
				response,
				event.target,
				event.raw
			);
			onScoringResponse(componentEvent);
		}
	};
	let sortedLabels: { label: string }[] = [];
	const listSorted = (labels: string[]): typeof sortedLabels => {
		labels.forEach((label) => {
			sortedLabels.push({
				label: label,
			});
		});
		return sortedLabels;
	};

	let radioData: RadioProps['data'] = labels.map((label) => {
		return {
			value: label,
		};
	});

	let radioProps: RadioProps = {
		data: radioData,
		group: response[0]?.label,
		onRadioChange: inputChangeHandler,
	};
</script>

<form
	{...attr}
	class="sp-survey--question--form--scoring">
	{#if requireAll && requireUnique && values.length === labels.length}
		{#if maxLabel}
			<p class="sp-survey--question--form--scoring--min-label">
				{minLabel}
			</p>
		{/if}

		<SortableList
			data={listSorted(labels)}
			onSortSort={sortableEventHandler} />
		{#if maxLabel}
			<p class="sp-survey--question--form--scoring--max-label">
				{maxLabel}
			</p>
		{/if}
	{:else}
		<table>
			<thead>
				<tr>
					<th scope="row">&nbsp;</th>
					<th
						colspan={Math.floor(values.length * 0.5)}
						class="sp-survey--question--form--scoring--min-label">
						{minLabel}
					</th>
					<th
						colspan={Math.ceil(values.length * 0.5)}
						class="sp-survey--question--form--scoring--max-label">
						{maxLabel}
					</th>
				</tr>
			</thead>
			<tbody>
				{#each labels as label}
					<tr>
						<th
							scope="row"
							class="sp-survey--question--form--scoring--label-row"
							>{label}</th>

						<Radio {...radioProps} />
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<Button
					size={'small'}
					type="reset"
					onButtonClick={clearButtonClickHandler}>
					{definitions.scoringResetButton}
				</Button>
			</tfoot>
		</table>
	{/if}
</form>
