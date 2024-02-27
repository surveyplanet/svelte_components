<script
	lang="ts"
	context="module">
	import type { HTMLAttributes, HTMLMenuAttributes } from 'svelte/elements';
	export interface ChipData extends HTMLAttributes<HTMLDivElement> {
		label?: string;
		selected?: boolean;
	}

	export type ChipsProps = HTMLMenuAttributes & {
		data: ChipData[];
		selectable?: boolean;
		multiSelect?: boolean;
		removable?: boolean;
		onChipsClick?: (
			event: ComponentEvent<ChipData[], HTMLButtonElement>
		) => void;
		onChipsRemove?: (
			event: ComponentEvent<ChipData[], HTMLButtonElement>
		) => void;
	};
</script>

<script lang="ts">
	import { Icon, ComponentEvent } from './';

	let {
		data,
		selectable,
		multiSelect,
		removable,
		onChipsClick,
		onChipsRemove,
		...attr
	} = $props<ChipsProps>();

	const getChipId = (chipEl: HTMLButtonElement) => {
		const parent = chipEl.closest('.sp-chips--chip')! as HTMLButtonElement;
		return parent.id;
	};

	const toggle = (id: string, event: Event) => {
		data = data.map((chip) => {
			if (chip.id === id) {
				chip.selected = !chip.selected;
			} else if (!multiSelect) {
				chip.selected = false;
			}
			return chip;
		});

		if (typeof onChipsClick === 'function') {
			const componentEvent = new ComponentEvent(
				data,
				event.target as HTMLButtonElement,
				event
			);
			onChipsClick(componentEvent);
		}
	};

	const chipClickHandler = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (!selectable) {
			return event.preventDefault();
		}
		const target = event.target as HTMLButtonElement;
		const id = getChipId(target);
		toggle(id, event);
	};

	const chipKeyDownHandler = (event: KeyboardEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (!selectable) {
			return event.preventDefault();
		}
		const target = event.target as HTMLButtonElement;
		const id = getChipId(target);
		if (event.key === 'Enter' || event.key === ' ') {
			toggle(id, event);
		}
	};

	const closeButtonClickHandler = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		const target = event.target as HTMLButtonElement;
		const id = getChipId(target);

		data = data.filter((chip) => chip.id !== id);
		if (typeof onChipsRemove === 'function') {
			const componentEvent = new ComponentEvent(
				data,
				event.target as HTMLButtonElement,
				event
			);
			onChipsRemove(componentEvent);
		}
	};
</script>

<menu
	{...attr}
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
