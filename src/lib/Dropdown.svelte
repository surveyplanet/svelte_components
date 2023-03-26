<script
	lang="ts"
	context="module">
	export interface dropdownData {
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

	const dispatchString: (name: string) => boolean = createEventDispatcher();

	export let data: dropdownData[];
	export let value: string | null = null;
	/// TODO: value should be a type id of the data
	export let label: string | null = null;
	export let minSearchableItems = 15;
	export let disabled = false;
	export let required = false;

	let visible = false;
	$: searchable = data.length >= minSearchableItems;
	$: dropdownButtonLabel =
		data.find((item) => item.id === value)?.label ?? '';
	$: closeButtonVisible = value?.length;
	$: newData = [...data];

	onMount(() => {
		// instead of searching for select, pass the value and set select to the one that is equivalent to the value
		for (const item of newData) {
			if (item.id === value) {
				item.selected = true;
			}
		}
	});

	// Don't set focus because there may be other input on the page
	// const setFocus = (el: HTMLInputElement) => {
	// 	el.focus();
	// };

	const toggleDropdown = () => {
		visible = !visible;
		dispatchString('toggle');
	};

	const setDropdownLabel = (id: string) => {
		value = id;
		let item = data.find((item) => item.id === id);
		if (item?.label) {
			for (let menuItem of data) {
				if (menuItem.id === id) {
					menuItem.selected = true;
				} else {
					menuItem.selected = false;
				}
			}
			dropdownButtonLabel = item?.label;
		}
	};

	const search = (value: string) => {
		value = value.toLowerCase().trim();

		if (value?.length) {
			visible = true;
			newData = [];

			for (let item of data) {
				if (item.label.toLowerCase().trim().includes(value)) {
					newData.push(item);
				}
			}
		} else {
			newData = [...data];
		}
	};

	const closeSearch = () => {
		newData = [...data];
		visible = false;
		console.log(closeButtonVisible);
		//TODO: upon closing search remove search bar and show dropdown
	};

	const menuUpdateHandler = (event: CustomEvent) => {
		setDropdownLabel(event.detail);
		dispatch('update', event.detail);
		toggleDropdown();
	};

	const searchKeyupHandler = (event: KeyboardEvent) => {
		if ((event.target as HTMLInputElement).value.length) {
			search((event.target as HTMLInputElement).value);
		} else {
			closeSearch();
		}
		dispatch('search', (event.target as HTMLInputElement).value);
	};

	const closeButtonHandler = () => {
		closeSearch();
		value = '';
		dispatchString('close');
	};
</script>

{#if label}
	<label
		for="sp-dropdown"
		class="sp-dropdown--label">{label}</label>
{/if}

<div
	class="sp-dropdown"
	class:sp-dropdown--required={required}
	class:sp-dropdown--open={visible}>
	{#if searchable && value?.length}
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
		{disabled}
		readonly={!searchable}
		value={dropdownButtonLabel}
		on:click={toggleDropdown}
		on:keyup={searchKeyupHandler} />

	<!-- I don't think we need a button and an input -->
	<!-- <button
		class="sp-dropdown--trigger"
		on:click={toggleDropdown}
		{disabled}>
		{dropdownButtonLabel}
	</button> -->

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
		data={newData}
		on:click={menuUpdateHandler} />
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
		.sp-text-input--label--require {
			color: $color--pink;
			font-size: $font-size--14;
		}
	}

	input {
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
		z-index: 1;
		&:hover {
			background-color: $color--slate-lighter;
			:global(.sp-icon path) {
				stroke: white;
			}
		}
	}
</style>
