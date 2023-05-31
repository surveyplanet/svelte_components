<script
	lang="ts"
	context="module">
	export interface ChipData {
		id: string;
		label?: string;
		selected?: boolean;
		title: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let data: ChipData[] = [];
	export let multiple = false;

	const dispatch: (name: string, detail: string) => boolean =
		createEventDispatcher();

	const chipClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLButtonElement;
		toggleSelected(target.id);
		dispatch('click', target.id);
	};

	const toggleSelected = (id: string) => {
		for (let chip of data) {
			if (chip.id === id) {
				chip.selected = !chip.selected;
			} else if (!multiple) {
				chip.selected = false;
			}
		}
	};
</script>

<div class="sp-chips">
	{#each data as chip}
		<button
			id={chip.id}
			title={chip.title}
			class="sp-chips--chip"
			class:sp-chips--chip--selected={chip.selected}
			on:click={chipClickHandler}>
			{chip.label}
		</button>
	{/each}
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-chips {
		display: flex;
		// flex-wrap: wrap;
		align-items: center;
		margin: $size-gutter;
		padding: $size-gutter;
		list-style: none;
		font: $font--default;
	}

	.sp-chips--chip {
		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 11px 20px;
		margin: $size-gutter--quarter;
		width: fit-content;
		height: 32px;
		background: #ffffff;
		border: 1px solid #ebe6d7;
		border-radius: 66px;
		flex: none;
		order: 2;
		flex-grow: 0;
	}

	.sp-chips--chip--selected {
		background: linear-gradient(180deg, #bdffd8 0%, #f7f5af 100%);
		border-radius: 60px;
	}
</style>
