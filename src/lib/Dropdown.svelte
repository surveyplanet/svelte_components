<script
	lang="ts"
	context="module">
	export interface DropdownOptions {
		label: string;
		id: string;
		meta?: string;
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Menu, Icon } from './index';
	import { onMount } from 'svelte';

	const dispatch: (name: string, detail: string) => boolean =
		createEventDispatcher();

	export let options: DropdownOptions[];
	export let value: DropdownOptions['id'] | null = null;
	export let label: string | null = null;
	export let searchThreshold = 15;
	export let disabled = false;
	export let required = false;

	$: console.log(value);

	let input: HTMLInputElement;
	let visible = false;
	let displayValue: DropdownOptions['label'] | '' = '';

	$: searchable = options.length >= searchThreshold;
	$: MenuData = [...options];

	onMount(() => {
		if (value?.length) {
			setValue(value, true);
		}
	});

	const reset = () => {
		MenuData = [...options];
		for (let item of MenuData) {
			item.selected = false;
		}
	};

	const setValue = (id: string, silent = false) => {
		value = id;
		displayValue = '';
		for (let item of MenuData) {
			item.selected = false;
			if (item.id === id) {
				item.selected = true;
				displayValue = item.label;
			}
		}
		if (!silent) {
			dispatch('change', value);
		}
	};

	const search = (query: string) => {
		query = query.toLowerCase().trim();

		if (query?.length) {
			visible = true;
			MenuData = options.filter((item) => {
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

	const searchFocusHandler = () => {
		visible = true;
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

	const closeButtonHandler = () => {
		clear();
	};
</script>

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
	class="sp-dropdown"
	class:sp-dropdown--open={visible}>
	{#if searchable && displayValue?.length}
		<button
			class="sp-dropdown--close-btn"
			on:click={closeButtonHandler}>
			<Icon
				name="x"
				size={16} />
		</button>
	{/if}

	<input
		type="text"
		class="sp-dropdown--search"
		bind:this={input}
		{disabled}
		value={displayValue}
		readonly={!searchable}
		on:focus={searchFocusHandler}
		on:blur={searchBlurHandler}
		on:keyup={searchKeyupHandler} />

	<svg
		class="sp-dropdown--toggle-icon"
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
</div>
{#if visible}
	<Menu
		data={MenuData}
		on:click={menuClickHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-dropdown {
		position: relative;
		&.sp-dropdown--open {
			.sp-dropdown--toggle-icon {
				rotate: (180deg);
			}
		}
	}

	label {
		color: $color--slate-dark;
		display: block;
		font: $font--default;
		font-size: $font-size--12;
		padding: 0 0 $size--12 $size--4;
		.sp-dropdown--label--required {
			color: $color--pink;
			font-size: $font-size--14;
		}
	}

	input {
		cursor: pointer;
		box-sizing: border-box;
		width: 100%;
		height: $size--40;
		min-width: $size--256;
		background-color: $color--white;
		border: 1px solid $color--slate-lighter;
		border-radius: $size-radius--default;
		margin: 0;
		padding: 0 0 0 $size--16;
		text-align: left;
		@include set-focus {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--slate;
		}
		&:active {
			border: 1px solid #e7e3ff;
			box-shadow: 0px 0px 0px 2px $color--light-purple-light;
		}

		// disabled controls can not receive focus and are not submitted with the
		// form and generally do not function as controls until they are enabled
		&:disabled {
			cursor: not-allowed;
			color: $color--slate-light;
			border-color: $color--slate-light;
			background-color: rgba(0, 0, 0, 0.075);
			box-shadow: none;
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}
	}

	.sp-dropdown--close-btn,
	.sp-dropdown--toggle-icon {
		cursor: pointer;
		position: absolute;
		right: $size-gutter--half;
	}

	.sp-dropdown--toggle-icon {
		top: calc(50% - 2px);
	}

	.sp-dropdown--close-btn {
		top: calc(50% - 8px);
		border: none;
		width: 16px;
		height: 16px;
		min-width: auto;
		margin: 0;
		padding: 0;
		background-color: white;
		border-radius: $size-radius--small;
		z-index: 1;
		&:hover {
			background-color: $color--slate-lighter;
			:global(.sp-icon path) {
				stroke: white;
			}
		}
	}

	// :global(html.dark) {
	// 	label {
	// 		color: $color--white;
	// 	}
	// 	.sp-dropdown--close-btn {
	// 		:global(.sp-icon path) {
	// 			stroke: white;
	// 		}

	// 		&:hover {
	// 			background-color: $color--slate-dark;
	// 			:global(.sp-icon path) {
	// 				stroke: white;
	// 			}
	// 		}
	// 	}
	// }
</style>
