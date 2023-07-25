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
	import { createEventDispatcher, onMount } from 'svelte';
	import { Menu, Icon } from './index';

	const dispatchChange = createEventDispatcher<{ change: string }>();

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

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-dropdown {
		font: $font--default;
		font-size: $font-size--default;
		&.sp-dropdown--open {
			.sp-dropdown--toggle-btn svg {
				rotate: (180deg);
			}
		}

		&.sp-dropdown--medium {
			font-size: $font-size--14;
			input {
				height: $size--48;
			}
		}
		&.sp-dropdown--large {
			font-size: $font-size--16;
			input {
				height: $size--52;
			}
		}
		:global(.sp-menu) {
			max-width: 100%;
			// width: 100%;
		}
	}

	label {
		color: $color--dark;
		display: block;
		padding: 0 0 $size--12 $size--4;
		font: inherit;
		.sp-dropdown--label--required {
			color: $color--pink;
			font-size: smaller;
		}
	}

	.sp-dropdown--input-wrapper {
		position: relative;
	}

	input {
		cursor: pointer;
		width: 100%;
		height: $size--40;
		min-width: $size--256;
		font: inherit;
		background-color: $color--white;
		border: 1px solid $color--beige-darker;
		border-radius: $size-radius--default;
		margin: 0;
		padding: 0 0 0 $size--16;
		text-align: left;

		&::placeholder {
			color: $color--beige-darkest;
		}

		@include set-focus {
			border: 1px solid $color--beige-darker;
			box-shadow: 0px 0px 0px 2px $color--beige-dark;
		}

		&:active {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--beige-darkest;
		}

		// disabled controls can not receive focus, are not submitted with the
		// form and generally do not function as controls until they are enabled
		&:disabled {
			cursor: not-allowed;
			color: $color--beige-darkest;
			border-color: $color--beige-darker;
			background-color: $color--beige-dark;
			box-shadow: none;
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}
	}

	.sp-dropdown--toggle-btn,
	.sp-dropdown--close-btn {
		cursor: pointer;
		position: absolute;
		top: 1px;
		right: 0;
		display: flex; // inline-flex
		justify-content: center;
		align-items: center;
		width: $size--40;
		height: calc(100% - 2px);
		background-color: transparent;
		border: none;
		border-radius: 0 $size-radius--small $size-radius--small 0;
		margin: 0;
		padding: 0;
		outline: none;
		&:disabled {
			:global(path) {
				stroke: $color--beige-darkest;
			}
		}
	}

	.sp-dropdown--close-btn {
		z-index: 1;
		&:hover {
			background-color: $color--beige-darker;
			:global(.sp-icon path) {
				stroke: $color--white;
			}
		}
	}

	// dark mode
	// :global(html.dark) {
	// 	label {
	// 		color: $color--white;
	// 	}
	// 	.sp-dropdown--close-btn {
	// 		:global(.sp-icon path) {
	// 			stroke: $color--white;
	// 		}

	// 		&:hover {
	// 			background-color: $color--dark;
	// 			:global(.sp-icon path) {
	// 				stroke: $color--white;
	// 			}
	// 		}
	// 	}
	// }
</style>
