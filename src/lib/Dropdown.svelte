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
		onDropdownChange?: (
			event: ComponentEvent<DropdownOption['id'], HTMLInputElement>
		) => void;
	};
</script>

<script lang="ts">
	import { Menu, Icon, ComponentEvent } from './';
	import { onMount } from 'svelte';

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

	let input: HTMLInputElement | undefined = $state();
	let selectedOption: DropdownOption | undefined = $state();
	let visible = $state(false);

	let searchable = options.length >= searchThreshold;
	let dropdownOptions = $state([...options]);

	onMount(() => {
		if (value?.length) {
			setValue(value, true);
		}
	});

	const reset = () => {
		dropdownOptions = [...options];
		deselect(dropdownOptions);
	};
	const deselect = (data: DropdownOption[]) => {
		for (let item of data) {
			item.selected = false;
			if (item.submenu) {
				deselect(item.submenu);
			}
		}
	};

	const findSelected = (
		id: string,
		menu: MenuData[]
	): DropdownOption | undefined => {
		for (let item of menu) {
			if (item.id === id) {
				item.selected = true;
				return item;
			} else if (item.submenu) {
				const found = findSelected(id, item.submenu);
				if (found) {
					return found;
				}
			}
		}
		return undefined;
	};

	const setValue = (id: string, silent = false, event?: Event) => {
		value = id;
		const option = findSelected(id, dropdownOptions);
		if (option) {
			selectedOption = option;
		}
		if (!silent && input && typeof onDropdownChange === 'function') {
			let componentEvent = new ComponentEvent(id, input);
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
			dropdownOptions = options.filter((item) => {
				// item.selected = false;
				if (item.label)
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

	const menuClickHandler = (
		event: ComponentEvent<string, HTMLButtonElement>
	) => {
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
			if (
				newFocusEl.classList.contains('sp-menu--item--btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn--label')
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
		if (
			event.key === 'Down' ||
			event.key === 'ArrowDown' ||
			event.key === 'Up' ||
			event.key === 'ArrowUp' ||
			event.key === 'Enter' ||
			event.key === 'Tab' ||
			event.key === 'Return'
		) {
			return;
		}
		visible = false;
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

	const menuUpdateHandler = () =>
		// event: ComponentEvent<string, HTMLButtonElement>
		{
			// console.log('menuUpdateHandler', event.value);
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

	<div
		class="sp-dropdown--input-wrapper"
		class:sp-dropdown--input-wrapper--icon={selectedOption?.icon?.length}>
		{console.log('selectedOption', { ...selectedOption })}
		{#if selectedOption && selectedOption.icon}
			<!-- {#key selectedOption.icon} -->
			<Icon
				name={selectedOption.icon}
				size={16} />
			<!-- {/key} -->
		{/if}

		{#if searchable && selectedOption?.label?.length}
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
			value={selectedOption?.label}
			readonly={!searchable}
			onclick={searchClickHandler}
			onblur={searchBlurHandler}
			onkeyup={searchKeyupHandler}
			onkeydown={searchKeyDownHandler} />
	</div>

	<Menu
		bind:data={dropdownOptions}
		visible={visible && dropdownOptions.length > 0}
		{size}
		onMenuClick={menuClickHandler}
		onMenuUpdate={menuUpdateHandler} />
</div>
