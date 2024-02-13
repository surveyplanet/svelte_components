<script
	lang="ts"
	context="module">
	import type { Language } from '@surveyplanet/types';

	export interface ScoringDefinitions {
		scoringResetButton: Language['definitions']['scoringResetButton'];
	}

	export type ScoringProps = {
		id: string;
		definitions: ScoringDefinitions;
		values: ScoringProperties['values'];
		labels: ScoringProperties['labels'];
		maxLabel: ScoringProperties['maxLabel'];
		minLabel: ScoringProperties['minLabel'];
		requireAll?: ScoringProperties['requireAll'];
		requireUnique?: ScoringProperties['requireUnique'];
		response?: ScoringValue[];
		onScoringResponse?: (value: ScoringValue[]) => void;
	};
</script>

<script lang="ts">
	import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
	import { Button, Radio } from '../';
	import SortableList from '$lib/SortableList.svelte';

	let {
		id,
		definitions,
		values,
		labels,
		maxLabel,
		minLabel,
		requireAll = false,
		requireUnique = false,
		response = [],
		onScoringResponse,
	} = $props<ScoringProps>();

	const updateResponse = (value: ScoringValue) => {
		// remove value if already exits.
		response = response?.filter((val) => val.label !== value.label);
		response.push(value);
	};

	const inputChangeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;

		const value: ScoringValue = {
			label: target.name,
			value: Number(target.value),
		};

		updateResponse(value);

		if (onScoringResponse) onScoringResponse(response);
	};

	const sortableEventHandler = (list: { label: string }[]) => {
		for (let i = 0; i < list.length; i++) {
			response = response?.filter((val) => val.label !== list[i].label);
			response.push({
				label: list[i].label,
				value: values[i],
			});
		}
		if (onScoringResponse) onScoringResponse(response);
	};

	const clearButtonClickHandler = () => {
		response = [];
		if (onScoringResponse) onScoringResponse(response);
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
</script>

<form class="sp-survey--question--form--scoring">
	{#if requireAll && requireUnique && values.length === labels.length}
		{#if maxLabel}
			<p class="sp-survey--question--form--scoring--min-label">
				{minLabel}
			</p>
		{/if}

		<SortableList
			data={listSorted(labels)}
			onSort={sortableEventHandler} />
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
				{#each labels as label, rowIndex}
					<tr>
						<th
							scope="row"
							class="sp-survey--question--form--scoring--label-row"
							>{label}</th>

						{#each values as value, cellIndex}
							<td>
								<Radio
									name={label}
									value={value.toString()}
									id="{id}-{rowIndex}-{cellIndex}"
									onRadioChange={inputChangeHandler} />
							</td>
						{/each}
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
