<script
	lang="ts"
	context="module">
	import type { Language } from '@surveyplanet/types';

	export interface ScoringDefinitions {
		scoringResetButton: Language['definitions']['scoringResetButton'];
	}
</script>

<script lang="ts">
	import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
	import { createEventDispatcher } from 'svelte';
	import { Button, Radio } from '../';

	const dispatchResponse = createEventDispatcher<{
		response: ScoringValue[];
	}>();

	export let id: string;
	export let definitions: ScoringDefinitions;
	export let values: ScoringProperties['values'] = [];
	export let labels: ScoringProperties['labels'] = [];
	export let maxLabel: ScoringProperties['maxLabel'];
	export let minLabel: ScoringProperties['minLabel'];
	export let requireAll: ScoringProperties['requireAll'] = false;
	export let requireUnique: ScoringProperties['requireUnique'] = false;
	export let response: ScoringValue[] = [];

	const updateResponse = (value: ScoringValue) => {
		// remove value if already exits.
		response = response?.filter((val) => val.label !== value.label);
		response.push(value);
	};

	const inputChangeHandler = (event: CustomEvent) => {
		const target = event.detail.target as HTMLInputElement;

		const value = {
			label: target.name,
			value: Number(target.value),
		} as ScoringValue;

		updateResponse(value);

		dispatchResponse('response', response);
	};

	const clearButtonClickHandler = () => {
		// This is a 'reset' button so no need unset radio buttons as long as its inside a form.
		// Still need to rest the response array.
		response = [];
	};
</script>

<form class="sp-survey--question--scoring--form">
	<table>
		<thead>
			<tr>
				<th scope="row">&nbsp;</th>
				<th
					colspan={Math.floor(values.length * 0.5)}
					class="sp-survey--question--scoring--form--min-label">
					{minLabel}
				</th>
				<th
					colspan={Math.ceil(values.length * 0.5)}
					class="sp-survey--question--scoring--form--max-label">
					{maxLabel}
				</th>
			</tr>
		</thead>
		<tbody>
			{#each labels as label, rowIndex}
				<tr>
					<th
						scope="row"
						class="sp-survey--question--scoring--form--label-row"
						>{label}</th>

					{#each values as value, cellIndex}
						<td>
							<Radio
								name={label}
								value={value.toString()}
								id="{id}-{rowIndex}-{cellIndex}"
								on:change={inputChangeHandler} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<Button
				size={'small'}
				type="reset"
				on:click={clearButtonClickHandler}>
				{definitions.scoringResetButton}
			</Button>
		</tfoot>
	</table>
</form>
