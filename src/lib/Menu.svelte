<script
	lang="ts"
	context="module">
	import { Icon, type IconName } from './index';
	export interface MenuData {
		id: string;
		label?: string;
		html?: string;
		icon?: IconName;
		meta?: string;
		divide?: boolean;
		inline?: boolean;
		selected?: boolean;
		submenu?: MenuData[];
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const dispatch: (name: string, detail: string) => boolean =
		createEventDispatcher();

	/**
	 * Menu data
	 */
	export let data: MenuData[] = [{ id: 'edit' }];

	const scrollMenu = (direction: 'up' | 'down' | 'left' | 'right') => {
		const allButtons = Array.from(
			document.querySelectorAll('.sp-menu--item button')
		) as HTMLButtonElement[];
		const activeButton = document.activeElement as HTMLButtonElement;
		const activeButtonIndex = allButtons.indexOf(activeButton);

		if (
			!activeButton.parentElement?.classList.contains(
				'sp-menu--item--inline'
			)
		) {
			if (direction === 'down') {
				allButtons[(activeButtonIndex + 1) % allButtons.length].focus();
			} else if (direction === 'up') {
				allButtons[
					(activeButtonIndex + allButtons.length - 1) %
						allButtons.length
				].focus();
			} else if (
				direction === 'right' &&
				activeButton.parentElement?.classList.contains(
					'sp-menu--item--submenu'
				)
			) {
				activeButton.click();
			} else if (direction === 'left' && location.length) {
				backClickHandler();
			}
		} else {
			if (direction === 'right') {
				allButtons[(activeButtonIndex + 1) % allButtons.length].focus();
			} else if (direction === 'left') {
				allButtons[
					(activeButtonIndex + allButtons.length - 1) %
						allButtons.length
				].focus();
			} else if (direction === 'up' && location.length) {
				backClickHandler();
			}
		}
	};

	const transitionProps = {
		axis: 'x',
		duration: 150,
		easing: cubicOut,
	};

	$: currentState = [...data];

	let location: string[] = [];

	const getState = (
		data: MenuData[],
		id: string
	): MenuData['submenu'] | null => {
		for (let item of data) {
			if (item.id === id && item.submenu?.length) {
				return item.submenu;
			} else if (item.submenu) {
				let result = getState(item.submenu, id);

				if (result) {
					return result;
				}
			}
		}
		return null; // item has no submenu
	};

	const arrowClickHandler = (event: KeyboardEvent) => {
		// user correct arrow keys when MenuData.inline is true;
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			scrollMenu('down');
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			scrollMenu('up');
		} else if (event.key === 'ArrowRight') {
			scrollMenu('right');
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			scrollMenu('left');
		}
	};

	const backClickHandler = () => {
		const id = location[location.length - 2];
		location.pop(); // remove the last location

		if (id) {
			const state = getState(data, id);

			if (state?.length) {
				currentState = [...state];
			}
		} else {
			currentState = [...data]; // go to root
		}
		dispatch('update', id);
	};

	const itemClickHandler = (event: MouseEvent) => {
		let id = (event.target as HTMLElement).id;
		// console.log('itemClickHandler', id);

		if (!id?.length) {
			const btn = (event.target as HTMLElement).closest('button');
			if (btn) {
				id = btn.id;
			}
		}

		const state = getState(data, id);

		if (state?.length) {
			location = location.concat([id]);
			currentState = [...state];
		}

		// if clicked item doesn't have a submenu dispatch 'click'
		// otherwise dispatch 'update'
		if (!state) {
			dispatch('click', id);
		} else {
			dispatch('update', id);
		}
	};

	const menuBlurHandler = (event: FocusEvent) => {
		dispatch('blur', (event.target as HTMLElement).id);
	};
</script>

<svelte:window on:keydown={arrowClickHandler} />
<ul
	class="sp-menu"
	on:blur={menuBlurHandler}>
	{#if location.length}
		<li transition:slide={transitionProps}>
			<button
				class="sp-menu--back-btn"
				on:click|preventDefault={backClickHandler}>
				<Icon
					name="arrowLeft"
					size={16} />
				<span class="sp-menu--back-btn--label">Back</span>
			</button>
		</li>
	{/if}
	{#each currentState as item}
		<li
			class="sp-menu--item"
			class:sp-menu--item--divide={item.divide}
			class:sp-menu--item--inline={item.inline}
			class:sp-menu--item--selected={item.selected}
			class:sp-menu--item--submenu={item?.submenu?.length}
			transition:slide={transitionProps}>
			<button
				class="sp-menu--item--btn"
				id={item.id}
				on:click|preventDefault={itemClickHandler}>
				{#if item.label}
					<span class="sp-menu--item--label">
						{item.label}
					</span>
				{/if}

				{#if item.html}
					{@html item.html}
				{/if}

				{#if item.icon}
					<Icon
						name={item.icon}
						size={16} />
				{/if}

				{#if item.meta}
					<span class="sp-menu--item--meta">{item.meta}</span>
				{/if}
			</button>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-menu {
		list-style: none;
		overflow: hidden;
		margin: 0;
		padding: $size-gutter--quarter 0;
		background-color: white;
		box-shadow: 0px 5px 5px rgba(142, 117, 205, 0.1);
		border-radius: $size-radius--large;
		max-width: 260px;
		max-height: 200px;
		overflow-y: auto;
		// &:empty { empty doesn't work because of whitespace
		&:not(:has(li)) {
			display: none;
		}
	}
	.sp-menu--item {
		position: relative;
		&.sp-menu--item--submenu {
			button:before {
				content: '';
				position: absolute;
				top: calc(50% - 3.5px);
				right: $size-gutter--half;
				display: block;
				width: 5px;
				height: 7px;
				background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjciIGZpbGw9Im5vbmUiPjxwYXRoIHN0cm9rZT0iIzE2MjEzNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0ibTEuMDk1IDYuMTQzIDIuNDE2LTIuNDE2LTIuNDk0LTIuNDk0Ii8+PC9zdmc+');
				background-repeat: no-repeat;
				background-position: 50% 50%;
			}
		}
		&.sp-menu--item--divide {
			border-top: 1px solid #dcdee1;
		}

		&.sp-menu--item--inline {
			display: inline;
			button {
				width: auto;
				display: inline;
			}
			&.sp-menu--item--selected {
				// no background-color if selected button is displayed inline
				button {
					background-color: transparent;
				}
			}
		}
		&.sp-menu--item--selected {
			button {
				background-color: $color--light-purple-light;
			}
		}

		// not supported in FF
		// disable the button hover and focus states for color chips
		&:has(> button .color-chip) {
			/* styles to apply to the li tag */
			button {
				background-color: transparent !important;
				&:hover,
				&:focus {
					:global(.color-chip) {
						border: 1px solid $color--black;
					}
				}
			}
		}

		:global(.color-chip) {
			position: relative;
			box-sizing: border-box;
			display: inline-block;
			border: 1px solid transparent;
			width: $size--16;
			height: $size--16;
			border-radius: 50%;
			vertical-align: middle;
		}

		&.sp-menu--item--selected {
			:global(.color-chip) {
				&:before {
					content: '';
					position: absolute;
					top: 4px;
					left: 4px;
					display: block;
					width: 7px;
					height: 6px;
					background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3IiBoZWlnaHQ9IjYiIGZpbGw9Im5vbmUiPjxwYXRoIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0ibS44MDUgMy42ODggMS41IDEuNSAzLjUtMy41Ii8+PC9zdmc+');
					background-repeat: no-repeat;
					background-position: 50% 50%;
				}
			}
		}
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
		&:focus {
			background: $color--light-purple-light;
			outline: none;
		}
		:global(svg) {
			margin-left: auto;
		}
		&.sp-menu--back-btn {
			border-bottom: 1px solid #dcdee1;
			.sp-menu--back-btn--label {
				padding-left: $size-gutter--quarter;
			}
			:global(svg) {
				margin-left: 0;
			}
		}

		.sp-menu--item--meta {
			margin-left: auto;
			color: $color--slate;
		}
	}
</style>
