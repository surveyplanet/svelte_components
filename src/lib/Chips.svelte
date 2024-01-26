<script
	lang="ts"
	context="module">
	export interface ChipData {
		id: string;
		label?: string;
		selected?: boolean;
	}

	export type ChipsProps = {
		data: ChipData[];
		selectable?: boolean;
		multiSelect?: boolean;
		removable?: boolean;
		onclick?: (data: ChipData[]) => void;
		onremove?: (data: ChipData[]) => void;
	};
</script>

<script lang="ts">
	import { Icon } from './index';
	let {
		data = [],
		selectable = false,
		multiSelect = false,
		removable = false,
		onclick,
		onremove,
	} = $props<ChipsProps>();

	const getChipId = (chipEl: HTMLButtonElement) => {
		const parent = chipEl.closest('.sp-chips--chip')! as HTMLButtonElement;
		return parent.id;
	};

	const removeHandler = (id: string) => {
		data = data.filter((chip) => chip.id !== id);
		if (onremove) onremove(data);
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

		if (onclick) onclick(data);
	};

	const chipClickHandler = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!selectable) {
			return e.preventDefault();
		}
		const target = e.target as HTMLButtonElement;
		const id = getChipId(target);
		toggle(id);
	};

	const chipKeyDownHandler = (e: KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!selectable) {
			return e.preventDefault();
		}
		const target = e.target as HTMLButtonElement;
		const id = getChipId(target);
		if (e.key === 'Enter' || e.key === ' ') {
			toggle(id);
		}
	};

	const closeButtonClickHandler = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const target = e.target as HTMLButtonElement;
		const id = getChipId(target);
		removeHandler(id);
	};
</script>

<menu
	class="sp-chips sp-form-control"
	class:sp-chips--selectable={selectable}
	class:sp-chips--multi={multiSelect}>
	{#each data as chip}
		<li>
			<div
				id={chip.id}
				class="sp-chips--chip"
				class:sp-chips--chip--selected={chip.selected}
				onclick={chipClickHandler}
				onkeydown={chipKeyDownHandler}
				tabindex="0"
				role="button">
				<span class="sp-chips--chip--label"> {chip.label} </span>
				{#if removable}
					<button
						title="Remove"
						class="sp-chips--chip--close-btn"
						onclick={closeButtonClickHandler}>
						<Icon
							name="x"
							size={20} />
					</button>
				{/if}
			</div>
		</li>
	{/each}
</menu>
