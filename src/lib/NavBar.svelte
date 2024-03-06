<script
	context="module"
	lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { Icon, type IconName, type ToolTipOptions } from './index';

	export interface NavBarData {
		icon: IconName;
		link?: string;
		title: string;
		id: string;
		tooltip?: ToolTipOptions;
	}

	export type NavBarProps = HTMLAttributes<HTMLElement> & {
		data: NavBarData[];
		navMenuData?: MenuData[];
		vertical?: boolean;
		onNavClick?: (
			event: ComponentEvent<string, HTMLButtonElement | HTMLLinkElement>
		) => void;
	};
</script>

<script lang="ts">
	import {
		type Placement,
		computePosition,
		flip,
		shift,
		offset,
	} from '@floating-ui/dom';
	import { ComponentEvent, Menu, type MenuData } from './';

	let { data, navMenuData, vertical, onNavClick, ...attr } =
		$props<NavBarProps>();

	let menuVisible = $state(false);

	let navBarEl: HTMLElement | undefined = $state();
	let navBarMenuEl: HTMLElement | undefined = $state();

	let padding = 10; // adjust as needed

	$effect(() => {
		if (!navBarMenuEl) return;

		const middleware = [flip(), shift({ padding }), offset(padding)];

		if (navBarEl && navBarMenuEl) {
			computePosition(navBarEl, navBarMenuEl, {
				placement: 'bottom-start' as Placement,
				middleware,
			}).then(({ x, y }) => {
				Object.assign(navBarMenuEl!.style, {
					left: `${x}px`,
					top: `${y}px`,
				});
			});
		}
	});

	const navButtonClickHandler = (event: MouseEvent) => {
		const target = event.target as HTMLLinkElement;
		if (target.href?.length) {
			window.location.href = target.href;
		} else {
			event.preventDefault();
			// event.stopPropagation();
			if (typeof onNavClick === 'function') {
				const componentEvent = new ComponentEvent(
					target.id,
					target,
					event
				);
				onNavClick(componentEvent);
			}
		}
	};

	const navMenuTriggerClickHandler = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		menuVisible = !menuVisible;
	};

	const onMenuBlur = (
		event: ComponentEvent<undefined, HTMLButtonElement | HTMLDivElement>
	) => {
		const newFocusEl =
			((event.raw! as FocusEvent).relatedTarget as HTMLElement) || null;
		// let menu hide itself after value has been set
		if (newFocusEl?.classList) {
			if (
				newFocusEl.classList.contains('sp-menu--item--btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn') ||
				newFocusEl.classList.contains('sp-menu--back-btn--label') ||
				newFocusEl.classList.contains('sp-nav--menu-trigger')
			) {
				return;
			}
		}
		menuVisible = false;
	};

	const menuClickHandler = (
		event: ComponentEvent<string, HTMLButtonElement>
	) => {
		menuVisible = false;
		if (typeof onNavClick === 'function') {
			const componentEvent = new ComponentEvent(
				event.value,
				event.target as HTMLButtonElement,
				event.raw
			);
			onNavClick(componentEvent);
		}
	};
</script>

<nav
	{...attr}
	bind:this={navBarEl}
	class="sp-nav"
	class:sp-nav--vertical={vertical}>
	{#each data as item}
		<a
			class="sp-nav--link"
			href={item.link}
			id={item.id}
			title={item.title}
			onclick={navButtonClickHandler}>
			<div class="sp-nav--icon">
				<Icon
					name={item.icon}
					size={16} />
			</div>
		</a>
	{/each}

	{#if navMenuData?.length}
		<button
			class="sp-nav--menu-trigger"
			onclick={navMenuTriggerClickHandler}>
			<Icon
				name="ellipsis"
				size={16} />
		</button>
	{/if}
</nav>

{#if menuVisible && navMenuData?.length}
	<div
		bind:this={navBarMenuEl}
		class="sp-nav--menu">
		<Menu
			data={navMenuData}
			visible={true}
			onMenuClick={menuClickHandler}
			{onMenuBlur} />
	</div>
{/if}

<style>
	.sp-nav--icon {
		/* don't allow icons to receive target */
		pointer-events: none;
	}
</style>
