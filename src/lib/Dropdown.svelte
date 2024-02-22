<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export interface DropdownOption {
		label: string;
		id: string;
		meta?: string;
		selected?: boolean;
		submenu?: DropdownOption[];
	}

	export type DropdownProps = HTMLAttributes<HTMLDivElement> & {
		options: DropdownOption[];
		placeholder?: string;
		value?: DropdownOption['id'];
		label?: string;
		searchThreshold?: number;
		disabled?: boolean;
		required?: boolean;
		size?: 'small' | 'medium' | 'large';
		onDropdownChange?: (
			event: ComponentEvent<DropdownOption['id']>
		) => void;
	};
</script>

<script lang="ts">
	import { Menu, Icon, ComponentEvent } from './';

	let {
		options,
		placeholder,
		value,
		label,
		searchThreshold = 20, // needs a value to work and the number seems high enough so the search is not triggered in most use cases
		disabled,
		required,
		size = 'small', // input sizes are small by default
		onDropdownChange,
		...attr
	} = $props<DropdownProps>();

	let input: HTMLInputElement | undefined = $state(undefined);
	let visible = $state(false);
	let displayValue: DropdownOption['label'] | '' = $state('');

	let searchable = options.length >= searchThreshold;
	let menuData = $state([...options]);

	$effect(() => {
		if (value?.length) {
			setValue(value, true);
		}
	});

	const reset = () => {
		menuData = [...options];
		for (let item of menuData) {
			item.selected = false;
		}
	};

	const setValue = (id: string, silent = false, event?: Event) => {
		value = id;
		displayValue = '';
		for (let item of menuData) {
			item.selected = false;
			if (item.id === id) {
				item.selected = true;
				displayValue = item.label;
			}
		}
		if (!silent && typeof onDropdownChange === 'function') {
			let componentEvent;
			if (!event) {
				componentEvent = new ComponentEvent(
					id,
					input as EventTarget,
					undefined
				);
			} else {
				componentEvent = new ComponentEvent(id, event.target!, event);
			}
			onDropdownChange(componentEvent);
		}
	};
	// const change = new Event('change');

	const search = (query: string) => {
		query = query.toLowerCase().trim();

		if (query?.length) {
			visible = true;
			menuData = options.filter((item) => {
				// item.selected = false;
				return item.label.toLowerCase().trim().includes(query);
			});
		} else {
			reset();
		}
	};

	const clear = (event: Event) => {
		reset();
		setValue('', undefined, event); // unset value
		if (input) {
			input.focus();
		} // setting focus will open menu
	};

	const menuClickHandler = (event: ComponentEvent<string>) => {
		setValue(event.value!, undefined, event.raw);
		visible = false; // blur handler hides the menu
	};

	const searchClickHandler = () => {
		visible = !visible;
	};

	const searchBlurHandler = (event: FocusEvent) => {
		const newFocusEl = (event.relatedTarget as HTMLElement) || null;

		// let menu click handler hide itself after value has been set
		if (newFocusEl?.classList) {
			if (newFocusEl.classList.contains('sp-menu--item--btn')) {
				return;
			}
		}

		visible = false;
	};

	const searchKeyupHandler = (event: KeyboardEvent) => {
		const target = event.target as HTMLInputElement;
		search(target.value);
	};

	const closeButtonHandler = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		clear(event);
	};

	const toggleIconClickHandler = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		visible = !visible;
	};
</script>

<div
	{...attr}
	class="sp-form-control sp-dropdown sp-dropdown--{size}"
	class:sp-dropdown--open={visible}>
	{#if label}
		<label
			for="sp-dropdown"
			class="sp-dropdown--label">
			{label}
			{#if required}
				<span class="sp-dropdown--label--required">*</span>
			{/if}
		</label>
	{/if}

	<div class="sp-dropdown--input-wrapper">
		{#if searchable && displayValue?.length}
			<button
				class="sp-dropdown--close-btn"
				{disabled}
				onclick={closeButtonHandler}>
				<Icon
					name="x"
					size={16} />
			</button>
		{:else}
			<button
				class="sp-dropdown--toggle-btn"
				{disabled}
				onclick={toggleIconClickHandler}>
				<svg
					class="sp-dropdown--toggle-btn--icon"
					width="7"
					height="4"
					viewBox="0 0 7 4"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1.08984 0.830868L3.50606 3.24707L6.0002 0.75293"
						stroke="#162137"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</button>
		{/if}

		<input
			type="text"
			class="sp-dropdown--search"
			bind:this={input}
			{placeholder}
			{disabled}
			value={displayValue}
			readonly={!searchable}
			onclick={searchClickHandler}
			onblur={searchBlurHandler}
			onkeyup={searchKeyupHandler} />
	</div>

	{#if visible}
		<Menu
			data={menuData}
			{size}
			onMenuClick={menuClickHandler} />
	{/if}
</div>
