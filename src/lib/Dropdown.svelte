<script
	lang="ts"
	context="module">
	export interface DropdownOption {
		label: string;
		id: string;
		meta?: string;
		selected?: boolean;
		submenu?: DropdownOption[];
	}

	export type DropdownProps = {
		options: DropdownOption[];
		placeholder?: string;
		value?: DropdownOption['id'];
		label?: string;
		searchThreshold?: number;
		disabled?: boolean;
		required?: boolean;
		size?: 'small' | 'medium' | 'large';
		onDropdownChange?: (value: DropdownOption['id']) => void;
	};
</script>

<script lang="ts">
	import { Menu, Icon, TextInput } from './index';

	let {
		options,
		placeholder = null,
		value,
		label = null,
		searchThreshold = 15,
		disabled = false,
		required = false,
		size = 'small',
		onDropdownChange,
	} = $props<DropdownProps>();

	// let input = $state<undefined | typeof TextInput>(undefined);
	let hasFocus = $state(false);
	let visible = $state(false);
	let displayValue: DropdownOption['label'] | '' = $state('');

	let searchable = $derived(options.length >= searchThreshold);
	let menuData = $state([...options]);

	$effect(() => {
		if (value?.length) {
			setValue(value, true);
		}

		if (visible) {
			hasFocus = true;
		}
	});

	const reset = () => {
		menuData = [...options];
		for (let item of menuData) {
			item.selected = false;
		}
	};

	const setValue = (id: string, silent = false) => {
		value = id;
		displayValue = '';
		for (let item of menuData) {
			item.selected = false;
			if (item.id === id) {
				item.selected = true;
				displayValue = item.label;
			}
		}
		if (!silent && onDropdownChange) {
			onDropdownChange(value);
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

		hasFocus = true;
		// setting focus will open menu
	};

	const clear = () => {
		reset();
		setValue(''); // unset value
		hasFocus = true;
		// setting focus will open menu
	};

	const menuClickHandler = (id: string) => {
		setValue(id);
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

	const menuBlurHandler = () => {
		// visible = false;
	};

	const searchKeyupHandler = (event: KeyboardEvent) => {
		const menus = document.querySelectorAll('.sp-menu');
		const mostRecentMenu = menus[menus.length - 1];

		if (event.key === 'ArrowDown') {
			const firstButton = mostRecentMenu.querySelector(
				'.sp-menu--item button'
			);
			if (firstButton instanceof HTMLButtonElement) firstButton.focus();
		} else if (event.key === 'ArrowUp') {
			const lastButton = mostRecentMenu.querySelector(
				'.sp-menu--item button:last-child'
			);
			if (lastButton instanceof HTMLButtonElement) lastButton.focus();
		} else if (event.key === 'Escape') {
			visible = false;
		}
		const target = event.target as HTMLInputElement;
		search(target.value);
	};

	const closeButtonHandler = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		clear();
	};

	const toggleIconClickHandler = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		visible = !visible;
	};
</script>

<div
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

		<!-- <input
			bind:this={input}
			type="text"
			class="sp-dropdown--search"
			{placeholder}
			{disabled}
			value={displayValue}
			readonly={!searchable}
			onclick={searchClickHandler}
			onblur={searchBlurHandler}
			onkeyup={searchKeyupHandler} /> -->
		{#if searchable}
			<TextInput
				id={(Date.now() + Math.random()).toString(36)}
				name="sp-dropdown-search"
				bind:focus={hasFocus}
				{placeholder}
				{disabled}
				type="search"
				value={displayValue}
				readonly={!searchable}
				onTextInputFocus={searchClickHandler}
				onTextInputBlur={searchBlurHandler}
				onTextInputKeyup={searchKeyupHandler} />
		{:else}
			<TextInput
				id={(Date.now() + Math.random()).toString(36)}
				name="sp-dropdown-selector"
				bind:focus={hasFocus}
				{placeholder}
				{disabled}
				type="text"
				value={displayValue}
				readonly
				onTextInputBlur={searchBlurHandler}
				onTextInputKeyup={searchKeyupHandler} />
		{/if}
	</div>

	{#if visible}
		<Menu
			data={menuData}
			{size}
			onMenuClick={menuClickHandler}
			onMenuBlur={menuBlurHandler} />
	{/if}
</div>
