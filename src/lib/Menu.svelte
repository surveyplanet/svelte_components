<script
	lang="ts"
	context="module">
	import { ComponentEvent, Icon, type IconName } from './';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	export interface MenuData extends HTMLButtonAttributes {
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
	export type MenuProps = HTMLAttributes<HTMLDivElement> & {
		data: MenuData[];
		size?: 'small' | 'medium' | 'large';
		visible?: boolean;
		onMenuUpdate?: (
			event: ComponentEvent<string, HTMLButtonElement>
		) => void;
		onMenuClick?: (
			event: ComponentEvent<string, HTMLButtonElement>
		) => void;
		onMenuBlur?: (
			event: ComponentEvent<undefined, HTMLButtonElement | HTMLDivElement>
		) => void;
		header?: Snippet;
		footer?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide, type SlideParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte'; // use to set focus on mount

	let {
		data,
		size = 'small',
		visible,
		onMenuUpdate,
		onMenuClick,
		onMenuBlur,
		header,
		footer,
		...attr
	} = $props<MenuProps>();
	let currentState = $state([...data]);
	let menu = $state<HTMLDivElement>();
	let location: string[] = $state([]);
	onMount(() => {
		// this will not trigger unless the menu is rendered on page/component.
		// Seems like onMount code only runs when the component is rendered and not when the inner HTML of the component is rendered
		// $effect.pre makes no difference here
		const parentElement = menu?.parentElement;
		if (parentElement && !parentElement.classList.contains('sp-dropdown')) {
			const allMenus = document.querySelectorAll('.sp-menu');
			const mostRecentMenu = allMenus[allMenus.length - 1];
			const menuButton = mostRecentMenu?.querySelector(
				'.sp-menu--item--btn'
			) as HTMLButtonElement;
			menuButton.focus();
		}
		//test this function
		const findSelectedSubmenu = (
			data: MenuData[]
		): { id: string; data: MenuData[] | undefined } | null => {
			const foundItem = data.find((item) => {
				if (item.submenu) {
					const foundSubItem = item.submenu.find(
						(subItem) => subItem.selected
					);
					if (foundSubItem) {
						return true;
					}
					// Recursive call to search in nested submenus
					return item.submenu.some((subItem) =>
						findSelectedSubmenu(subItem.submenu || [])
					);
				}
				return false;
			});

			return foundItem
				? { id: foundItem.id, data: foundItem.submenu }
				: null;
		};
		let item = findSelectedSubmenu(data || []);
		if (item === null) return;
		if (item.data?.length) {
			location = location.concat([item.id]);
			currentState = [...item.data];
		}
	});

	$effect(() => {});

	const scrollMenu = (
		direction: 'up' | 'down' | 'left' | 'right',
		event: Event
	) => {
		if (!menu) return;
		const allButtons = Array.from(
			menu.querySelectorAll('.sp-menu--item button')
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
				allButtons[0].focus();
			} else if (direction === 'left' && location.length) {
				backClickHandler(event);
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
				backClickHandler(event);
			}
		}
	};

	const getState = (
		data: MenuData[],
		id: string
	): MenuData['submenu'] | null => {
		// deselectAll(data, id);
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
	// deselect all items except the one with the id
	const deselectAll = (data: MenuData[]) => {
		for (let item of data) {
			if (item.selected) {
				item.selected = false;
			}
			if (item.submenu) {
				deselectAll(item.submenu);
			}
		}
	};
	let preventBlurVal = false;
	const preventBlur = () => {
		preventBlurVal = true;
	};

	const selectItem = (menuData: MenuData[], id: string) => {
		for (let item of menuData) {
			if (item.id === id && !item.submenu) {
				deselectAll(data); // only deselect an item if you can select a new one
				item.selected = true;
			} else if (item.submenu) {
				selectItem(item.submenu, id);
			}
		}
	};

	const itemClickHandler = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		let target = event.target as HTMLElement;

		let id = target.id;
		if (!id?.length) {
			const btn = (event.target as HTMLElement).closest('button');
			if (btn) {
				id = btn.id;
			}
		}
		selectItem(data, id);
		const state = getState(data || [], id);

		if (state?.length) {
			location = location.concat([id]);
			currentState = [...state];
		}

		data = [...data];

		const componentEvent = new ComponentEvent(
			id,
			event.target as HTMLButtonElement,
			event
		);
		// if clicked and item doesn't have a submenu dispatch 'click'
		// otherwise dispatch 'update'
		if (!state) {
			if (typeof onMenuClick === 'function') {
				onMenuClick(componentEvent);
			}
		} else {
			preventBlur();
			if (typeof onMenuUpdate === 'function') {
				onMenuUpdate(componentEvent);
			}
		}
	};

	const arrowClickHandler = (event: KeyboardEvent) => {
		// check mouse is over the menu
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			scrollMenu('down', event);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			scrollMenu('up', event);
		} else if (event.key === 'ArrowRight') {
			scrollMenu('right', event);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			scrollMenu('left', event);
		}
	};

	const backClickHandler = (event: Event) => {
		if (event) event.preventDefault();
		const id = location[location.length - 2];
		location.pop(); // remove the last location

		if (id) {
			const state = getState(data || [], id);

			if (state?.length) {
				currentState = [...state];
			}
		} else {
			currentState = [...(data || [])]; // go to root
		}
		preventBlur();
		if (typeof onMenuUpdate === 'function') {
			const componentEvent = new ComponentEvent(
				id,
				event.target as HTMLButtonElement,
				event
			);
			onMenuUpdate(componentEvent);
		}
	};

	const menuItemBlurHandler = (event: FocusEvent) => {
		const newFocusEl = (event.relatedTarget as HTMLElement) || null;
		if (newFocusEl?.classList) {
			if (
				newFocusEl.classList.contains('sp-menu--item--btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn--label')
			) {
				return;
			}
		}
		if (menu?.contains(newFocusEl)) return;
		menuBlurHandler(event);
	};
	const menuBlurHandler = (event: FocusEvent) => {
		if (typeof onMenuBlur === 'function' && !preventBlurVal) {
			const componentEvent = new ComponentEvent(
				undefined,
				event.target as HTMLDivElement,
				event
			);
			onMenuBlur(componentEvent);
		}
	};

	const transitionProps: SlideParams = {
		// axis: 'x',
		duration: 150,
		easing: cubicOut,
	};
</script>

{#if visible}
	<div
		bind:this={menu}
		{...attr}
		class="sp-menu sp-menu--{size}"
		role="menu"
		tabindex="0"
		onkeydown={arrowClickHandler}>
		<ul>
			<li class="sp-menu--header">
				{#if header}
					{@render header()}
				{/if}
			</li>

			{#if location.length}
				<li
					transition:slide={transitionProps}
					class="sp-menu--back">
					<button
						class="sp-menu--back-btn"
						onclick={backClickHandler}>
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
						onblur={menuItemBlurHandler}
						onclick={itemClickHandler}>
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

			<li class="sp-menu--footer">
				{#if footer}
					{@render footer()}
				{/if}
			</li>
		</ul>
	</div>
{/if}
