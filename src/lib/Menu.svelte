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
	export type MenuProps = {
		data?: MenuData[];
		size?: 'small' | 'medium' | 'large';
		onMenuUpdate?: (id: string) => void;
		onMenuClick?: (id: string) => void;
		onMenuBlur?: (event: FocusEvent) => void;
		header?: Snippet;
		footer?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	import { slide, type SlideParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	// import { onMount } from 'svelte'; // use to set focus on mount

	let { data, size, onMenuUpdate, onMenuClick, onMenuBlur, header, footer } =
		$props<MenuProps>();

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

	const transitionProps: SlideParams = {
		// axis: 'x',
		duration: 150,
		easing: cubicOut,
	};

	let currentState = $state([...(data || [])]);

	let location: string[] = $state([]);

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
		// check mouse is over the menu

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

	const backClickHandler = (event?: Event) => {
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
		if (onMenuUpdate) onMenuUpdate(id);
	};

	const itemClickHandler = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		let id = (event.target as HTMLElement).id;
		if (!id?.length) {
			const btn = (event.target as HTMLElement).closest('button');
			if (btn) {
				id = btn.id;
			}
		}

		const state = getState(data || [], id);

		if (state?.length) {
			location = location.concat([id]);
			currentState = [...state];
		}

		// if clicked and item doesn't have a submenu dispatch 'click'
		// otherwise dispatch 'update'
		if (!state) {
			if (onMenuClick) onMenuClick(id);
		} else {
			if (onMenuUpdate) onMenuUpdate(id);
		}
	};

	//TODO: add |global to transitions once it is fixed in svelte 5
</script>

<div
	class="sp-menu sp-menu--{size}"
	role="menu"
	tabindex="0"
	onkeydown={arrowClickHandler}
	onblur={onMenuBlur}>
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
					id={item.id}
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
