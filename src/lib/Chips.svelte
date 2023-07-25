<script
	lang="ts"
	context="module">
	export interface ChipData {
		id: string;
		label?: string;
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from './index';

	export let data: ChipData[] = [];
	export let selectable = false;
	export let multiSelect = false;
	export let removable = false;

	const dispatchClick = createEventDispatcher<{ click: ChipData[] }>();
	const dispatchRemove = createEventDispatcher<{ remove: ChipData[] }>();

	const getChipId = (chipEl: HTMLButtonElement) => {
		const parent = chipEl.closest('.sp-chips--chip')! as HTMLButtonElement;
		return parent.id;
	};

	const remove = (id: string) => {
		data = data.filter((chip) => chip.id !== id);
		dispatchRemove('remove', data);
	};

	const toggle = (id: string) => {
		data = data.map((chip) => {
			if (chip.id === id) {
				chip.selected = !chip.selected;
			} else if (!multiSelect) {
				chip.selected = false;
			}
			return chip;
		});

		dispatchClick('click', data);
	};

	const chipClickHandler = (e: MouseEvent) => {
		if (!selectable) {
			return e.preventDefault();
		}
		const target = e.target as HTMLButtonElement;
		const id = getChipId(target);
		toggle(id);
		console.log(data);
	};

	const closeButtonClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLButtonElement;
		const id = getChipId(target);
		remove(id);
	};
</script>

<menu
	class="sp-chips"
	class:sp-chips--selectable={selectable}
	class:sp-chips--multi={multiSelect}>
	{#each data as chip}
		<li>
			<button
				id={chip.id}
				class="sp-chips--chip"
				class:sp-chips--chip--selected={chip.selected}
				on:click|preventDefault={chipClickHandler}>
				<span class="sp-chips--chip--label"> {chip.label} </span>
				{#if removable}
					<button
						title="Remove"
						class="sp-chips--chip--close-btn"
						on:click|preventDefault|stopPropagation={closeButtonClickHandler}>
						<Icon
							name="x"
							size={20} />
					</button>
				{/if}
			</button>
		</li>
	{/each}
</menu>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-chips {
		display: flex;
		flex-wrap: wrap;
		gap: $size-gutter--half;
		list-style: none;
		font: $font--default;
	}

	.sp-chips--chip {
		cursor: default;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		gap: $size-gutter--quarter;
		padding: 0 $size-gutter--half;
		height: $size--32;
		border: 1px solid $color--beige-darker;
		border-radius: $size--32;
		background: $color--white;
		span {
			padding: 0;
			line-height: auto;
		}
	}

	.sp-chips--selectable {
		.sp-chips--chip {
			cursor: pointer;
		}

		.sp-chips--chip--selected {
			background: $color--gradient--green;
		}
	}

	button.sp-chips--chip--close-btn {
		cursor: pointer;
		display: inline-block;
		margin: 0;
		padding: 0;
		width: $size--12;
		height: $size--12;
		border: none;
		background-color: transparent;
		:global(svg) {
			transform: translate(-4px, -4px); // remove the space around icon
		}
	}
</style>
