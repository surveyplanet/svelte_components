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
	export let searchableMinItems = 15;
	export let disabled = false;
	export let required = false;

	let visible = false;
	let searchable = data.length >= searchableMinItems;
	let dropdownButtonLabel = '';

	$: closeButtonVisible = false;
	$: newData = [...data];

	onMount(() => {
		// instead of searching for select, pass the value and set select to the one that is equivalent to the value
		for (const item of data) {
			if (item.id === value) {
				item.selected = true;
			}
		}

		dropdownButtonLabel =
			data.find((item) => item.id === value)?.label || '';
	});

	const setFocus = (el: HTMLInputElement) => {
		el.focus();
	};

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
		closeButtonVisible = false;
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
		closeButtonVisible = true;
		dispatch('search', (event.target as HTMLInputElement).value);
	};

	const closeButtonHandler = () => {
		closeSearch();
		dispatchString('close');
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
		{#if closeButtonVisible}
			<button
				class="sp-dropdown--close-btn"
				on:click={closeButtonHandler}>X</button>
		{/if}

		<input
			on:keyup={searchKeyupHandler}
			use:setFocus
			type="text"
			class="sp-dropdown--search" />
	{:else}
		<button
			class="sp-dropdown--trigger"
			on:click={toggleDropdown}>
			{dropdownButtonLabel}
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
	}

	.sp-dropdown--close-btn {
		position: absolute;
		right: 0;
		top: 0;
		padding: $size-gutter--quarter $size-gutter--half;
		background: transparent;
		border: none;
		cursor: pointer;
	}
</style>
