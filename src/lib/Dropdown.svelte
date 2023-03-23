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

	export let data: dropdownData[];
	export let value: string | null = null;
	/// TODO: value should be a type id of the data
	export let label: string | null = null;
	export let searchableMinItems = 15;
	export let disabled = false;
	export let required = false;

	let visible = false;
	let searchable = data.length >= searchableMinItems;
	$: newData = [...data];

	onMount(() => {
		// instead of searching for select, pass the value and set select to the one that is equivalent to the value
		for (const item of data) {
			if (item.id === value) {
				item.selected = true;
			}
		}
	});

	const setFocus = (el: HTMLInputElement) => {
		el.focus();
	};

	const toggleDropdown = () => {
		visible = !visible;
		dispatch('toggle');
	};

	// const dropdownKeydownHandler = (event: KeyboardEvent) => {
	// 	if (event.key === 'Escape') {
	// 		visible = false;
	// 		dispatch('close', event.key);
	// 	}
	// 	if (event.key === 'ArrowDown') {
	// 		visible = true;

	// 		for (let i = 0; i < data.length; i++) {
	// 			let item = data[i];
	// 			if (item.selected) {
	// 				let nextItem = data[i + 1];
	// 				if (nextItem) {
	// 					item.selected = false;
	// 					nextItem.selected = true;
	// 					value = nextItem.label;
	// 					dispatch('arrowDown', nextItem.id);
	// 					console.log(value);
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	if (event.key === 'ArrowUp') {
	// 		visible = true;
	// 		for (let i = 0; i < data.length; i++) {
	// 			let item = data[i];
	// 			if (item.selected) {
	// 				let prevItem = data[i - 1];
	// 				if (prevItem) {
	// 					item.selected = false;
	// 					prevItem.selected = true;
	// 					value = prevItem.label;
	// 					console.log(value);
	// 					dispatch('arrowUp', prevItem.id);
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	}
	// };

	const setDropdownLabel = (id: string) => {
		value = id;
		if (item?.label) {
			for (let menuItem of data) {
				menuItem.selected = menuItem.id !== id;
			}
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

	const menuUpdateHandler = (event: CustomEvent) => {
		setDropdownLabel(event.detail);
		dispatch('update', event.detail);
		toggleDropdown();
	};

	//TODO: Add search support
	// loop trough data and filter out items that don't match search and this will be the new data
	//do the same thing we did with menu with a new array but without location
	// create x button to clear search and reset data

	const searchKeyupHandler = (event: KeyupEvent) => {
		search(event.target.value);
	};
</script>

{#if label}
	<label
		for="sp-dropdown"
		class="sp-dropdown--label">{label}</label>
{/if}
<!-- on:keydown={dropdownKeydownHandler} -->
<div
	class="sp-dropdown"
	class:sp-dropdown--disabled={disabled}
	class:sp-dropdown--required={required}
	class:sp-dropdown--open={visible}>
	{#if searchable}
		<button on:click={toggleDropdown}>X</button>
		<input
			on:keyup={searchKeyupHandler}
			use:setFocus
			type="text"
			class="sp-dropdown--search" />
	{:else}
		<button
			class="sp-dropdown--trigger"
			on:click={toggleDropdown}>
			{value}
			<Icon name="chevronDown" />
		</button>
	{/if}
</div>
{#if visible}
	<Menu
		data={newData}
		on:click={menuUpdateHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-dropdown {
		list-style: none;
		overflow: hidden;
		margin: 0;
		padding: $size-gutter--quarter 0;
		background-color: white;
		box-shadow: 0px 5px 5px rgba(142, 117, 205, 0.1);
		// border-radius: $size-radius--large;
		max-width: 260px;
	}

	button {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: start;
		align-items: center;
		cursor: pointer;
		border: none;
		background-color: transparent;
		padding: $size-gutter--quarter $size-gutter--half;
		margin: 0;
		&:hover {
			background: $color--light-purple-light;
		}

		svg {
			margin-left: auto;
		}
	}
</style>
