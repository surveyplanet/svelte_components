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
	import { createEventDispatcher, onMount } from 'svelte';
	import { Menu, Icon } from './index';

	const dispatchChange = createEventDispatcher<{
		change: DropdownOptions['id'];
	}>();

	export let options: DropdownOptions[];
	export let placeholder: string | null = null;
	export let value: DropdownOptions['id'] | null = null;
	export let label: string | null = null;
	export let searchThreshold = 15;
	export let disabled = false;
	export let required = false;
	export let size: 'small' | 'medium' | 'large' = 'small';

	let input: HTMLInputElement;
	let visible = false;
	let displayValue: DropdownOptions['label'] | '' = '';

	$: searchable = options.length >= searchThreshold;
	$: menuData = [...options];

	onMount(() => {
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
		if (!silent) {
			dispatchChange('change', value);
		}
	};

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

	const clear = () => {
		reset();
		setValue(''); // unset value
		input.focus(); // setting focus will open menu
	};

	const menuClickHandler = (event: CustomEvent) => {
		setValue(event.detail);
		visible = false; // blur handler hides the menu
	};

	const searchClickHandler = () => {
		visible = !visible;
	};

	const searchBlurHandler = (event: FocusEvent) => {
		console.log('searchBlurHandler');
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

	const closeButtonHandler = () => {
		clear();
	};

	const toggleIconClickHandler = () => {
		visible = !visible;
	};
</script>

<div
	class="sp-dropdown sp-dropdown--{size}"
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
				on:click|stopPropagation|preventDefault={closeButtonHandler}>
				<Icon
					name="x"
					size={16} />
			</button>
		{:else}
			<button
				class="sp-dropdown--toggle-btn"
				{disabled}
				on:click|stopPropagation|preventDefault={toggleIconClickHandler}>
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
			on:click={searchClickHandler}
			on:blur={searchBlurHandler}
			on:keyup={searchKeyupHandler} />
	</div>
	{#if visible}
		<Menu
			data={menuData}
			{size}
			on:click={menuClickHandler} />
	{/if}
</div>
