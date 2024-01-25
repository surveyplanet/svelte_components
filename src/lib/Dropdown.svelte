<script
	lang="ts"
	context="module">
	export interface DropdownOptions {
		label: string;
		id: string;
		meta?: string;
		selected?: boolean;
		submenu?: DropdownOptions[];
	}
</script>

<script lang="ts">
	import { Menu, Icon } from './index';

	let {
		options,
		placeholder = null,
		value = null,
		label = null,
		searchThreshold = 15,
		disabled = false,
		required = false,
		size = 'small',
		onchange,
	} = $props<{
		options: DropdownOptions[];
		placeholder?: string;
		value?: DropdownOptions['id'];
		label?: string;
		searchThreshold?: number;
		disabled?: boolean;
		required?: boolean;
		size?: 'small' | 'medium' | 'large';
		onchange?: (value: DropdownOptions['id']) => void;
	}>();

	let input: HTMLInputElement | undefined = $state(undefined);
	let dropdownVisible = $state(false);
	$inspect({ dropdownVisible, value });
	let displayValue: DropdownOptions['label'] | '' = $state('');

	let searchable = $derived(options.length >= searchThreshold);
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
		if (!silent && onchange) {
			onchange(value);
		}
	};
	// const change = new Event('change');

	const search = (query: string) => {
		query = query.toLowerCase().trim();

		if (query?.length) {
			dropdownVisible = true;
			menuData = options.filter((item) => {
				// item.selected = false;
				return item.label.toLowerCase().trim().includes(query);
			});
		} else {
			reset();
		}
	};

	const clear = () => {
		reset();
		setValue(''); // unset value
		if (input) {
			input.focus();
		} // setting focus will open menu
	};

	const menuClickHandler = (id: string) => {
		setValue(id);
		dropdownVisible = false; // blur handler hides the menu
	};

	const searchClickHandler = () => {
		dropdownVisible = !dropdownVisible;
	};

	const searchBlurHandler = (event: FocusEvent) => {
		const newFocusEl = (event.relatedTarget as HTMLElement) || null;

		// let menu click handler hide itself after value has been set
		if (newFocusEl?.classList) {
			if (newFocusEl.classList.contains('sp-menu--item--btn')) {
				return;
			}
		}

		dropdownVisible = false;
	};

	const searchKeyupHandler = (event: KeyboardEvent) => {
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
		dropdownVisible = !dropdownVisible;
	};
</script>

<div
	class="sp-dropdown sp-dropdown--{size}"
	class:sp-dropdown--open={dropdownVisible}>
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
	{#if dropdownVisible}
		<Menu
			data={menuData}
			{size}
			menuClick={menuClickHandler} />
	{/if}
</div>
