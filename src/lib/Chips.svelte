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
