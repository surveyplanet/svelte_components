<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { MenuData } from './';

	export type DropdownOption = MenuData;

	export type DropdownProps = HTMLAttributes<HTMLDivElement> & {
		options: DropdownOption[];
		placeholder?: string;
		value?: DropdownOption['id'];
		label?: string;
		searchThreshold?: number;
		disabled?: boolean;
		required?: boolean;
		size?: 'small' | 'medium' | 'large';
		displayIconOnly?: boolean;
		onDropdownChange?: (
			event: ComponentEvent<DropdownOption['id'], HTMLInputElement>
		) => void;
	};
</script>

<script lang="ts">
	import { Menu, Icon, ComponentEvent } from './';
	import { onMount } from 'svelte';
	import { cloneDeep } from '@surveyplanet/utilities';
	import { menuData } from '../routes/menu/menu_data';

	const SEARCH_KEYS: string[] = [
		'Down',
		'ArrowDown',
		'Up',
		'ArrowUp',
		'Enter',
		'Tab',
		'Return',
	] as const;

	let {
		options,
		placeholder,
		value,
		label,
		searchThreshold = 20, // needs a value to work and the number seems high enough so the search is not triggered in most use cases
		disabled,
		required,
		size = 'small', // input sizes are small by default
		displayIconOnly,
		onDropdownChange,
		...attr
	} = $props<DropdownProps>();

	let input: HTMLInputElement | undefined = $state();
	let selectedOption: DropdownOption | undefined = $state();
	let visible = $state(false);
	let dropdownOptions = $state([...options]);
	let showClearButton = $state(false);
	let searchable = $derived(options.length >= searchThreshold);

	onMount(() => {
		if (value?.length) {
			setValue(value, true);
		} else {
			selectedOption = findSelectedOption(dropdownOptions) || undefined;
		}
	});

	const reset = () => {
		dropdownOptions = [...options];
		resetMenu(dropdownOptions);
		if (input) {
			input.value = ''; // clear input
		}
	};

	const resetMenu = (data: DropdownOption[]) => {
		for (let item of data) {
			item.selected = false;
			if (item.submenu) {
				resetMenu(item.submenu);
			}
		}
	};

	const findSelectedOption = (
		menu: MenuData[]
	): DropdownOption | undefined => {
		for (let item of menu) {
			if (item.selected) {
				return item;
			} else if (item.submenu) {
				const found = findSelectedOption(item.submenu);
				if (found) {
					return found;
				}
			}
		}
		return undefined;
	};

	const findSelectedItem = (
		id: string,
		menu: MenuData[]
	): DropdownOption | undefined => {
		for (let item of menu) {
			if (item.id === id) {
				item.selected = true;
				return item;
			} else if (item.submenu) {
				const found = findSelectedItem(id, item.submenu);
				if (found) {
					return found;
				}
			}
		}
		return undefined;
	};

	const setValue = (id: string, silent = false, event?: Event) => {
		value = id;
		const option = findSelectedItem(value, dropdownOptions);
		if (option) {
			selectedOption = option;
		} else {
			selectedOption = undefined;
		}
		if (!silent && input && typeof onDropdownChange === 'function') {
			let componentEvent = new ComponentEvent(value, input);
			if (event) {
				componentEvent.raw = event;
			}
			onDropdownChange(componentEvent);
		}
	};

	const search = (query: string) => {
		query = query.toLowerCase().trim();

		if (query?.length) {
			visible = true;
			showClearButton = true;
			dropdownOptions = options.filter((item) => {
				// item.selected = false;
				if (item.label?.length) {
					return item.label.toLowerCase().trim().includes(query);
				}
			});
		} else {
			showClearButton = false;
			reset();
		}
	};

	const clearInput = (event: Event) => {
		setValue('', undefined, event); // unset value
		reset();
		if (input) {
			input.focus();
		} // setting focus will open menu
	};

	const menuClickHandler = (
		event: ComponentEvent<string, HTMLButtonElement>
	) => {
		setValue(event.value, undefined, event.raw);
		visible = false; // blur handler hides the menu
	};

	const searchClickHandler = () => {
		visible = !visible;
	};

	const searchBlurHandler = (event: FocusEvent) => {
		const newFocusEl = (event.relatedTarget as HTMLElement) || null;

		// let menu click handler hide itself after value has been set
		if (newFocusEl?.classList) {
			if (
				newFocusEl.classList.contains('sp-menu--item--btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn--label') ||
				newFocusEl.classList.contains('sp-dropdown--clear-btn') ||
				newFocusEl.classList.contains('sp-dropdown--toggle-btn')
			) {
				return;
			}
		}
		visible = false;
	};

	const searchKeyupHandler = (event: KeyboardEvent) => {
		if (event.key === 'Down' || event.key === 'ArrowDown') {
			const allMenus = document.querySelectorAll('.sp-menu');
			const mostRecentMenu = allMenus[allMenus.length - 1];
			const menuButton = mostRecentMenu?.querySelector(
				'.sp-menu--item--btn'
			) as HTMLButtonElement;
			menuButton.focus();
		} else if (event.key === 'Up' || event.key === 'ArrowUp') {
			const allMenus = document.querySelectorAll('.sp-menu');
			const mostRecentMenu = allMenus[allMenus.length - 1];
			const menuButton = mostRecentMenu?.querySelector(
				'.sp-menu--item--btn'
			) as HTMLButtonElement;
			menuButton.focus();
		} else {
			if (searchable) {
				const target = event.target as HTMLInputElement;
				search(target.value);
				visible = true;
			}
		}
	};

	const searchKeyDownHandler = (event: KeyboardEvent) => {
		if (SEARCH_KEYS.includes(event.key)) {
			return;
		}
		visible = false;
	};

	const clearButtonHandler = (event: Event) => {
		event.preventDefault();
		clearInput(event);
	};

	const toggleIconClickHandler = (event: Event) => {
		event.preventDefault();
		//get active element
		const activeElement = document.activeElement as HTMLElement;
		if (activeElement) {
			activeElement.blur();
		}

		visible = !visible;
	};
</script>

<div
	{...attr}
	class="sp-form-control sp-dropdown sp-dropdown--{size}"
	class:sp-dropdown--open={visible}>
	{#if label}
		<label
			for={attr.id}
			class="sp-dropdown--label">
			{label}
			{#if required}
				<span class="sp-dropdown--label--required">*</span>
			{/if}
		</label>
	{/if}

	<div
		class="sp-dropdown--input-wrapper"
		class:sp-dropdown--input-wrapper--icon={selectedOption?.icon?.length}>
		{#if selectedOption && selectedOption.icon && selectedOption.icon.length}
			<!-- TODO: this should not need to be re-rendered -->
			{#key selectedOption.icon}
				<Icon
					name={selectedOption.icon}
					size={16} />
			{/key}
		{/if}

		{#if showClearButton}
			<button
				class="sp-dropdown--clear-btn"
				{disabled}
				onclick={clearButtonHandler}>
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
			value={!selectedOption || displayIconOnly
				? ''
				: selectedOption?.label}
			readonly={!searchable}
			onclick={searchClickHandler}
			onblur={searchBlurHandler}
			onkeyup={searchKeyupHandler}
			onkeydown={searchKeyDownHandler} />
	</div>

	<!-- If dropdown options change re-render the component so it will animate -->
	{#key [...dropdownOptions]}
		<Menu
			bind:data={dropdownOptions}
			visible={visible && dropdownOptions.length > 0}
			{size}
			onMenuClick={menuClickHandler} />
	{/key}
</div>
