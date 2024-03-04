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
	// import { onMount } from 'svelte';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { ComponentEvent, Menu, type MenuData } from './';

	let { data, navMenuData, vertical, onNavClick, ...attr } =
		$props<NavBarProps>();

	let menuVisible = $state(false);

	let navBarEl: HTMLElement | undefined = $state();
	let navBarMenuEl: HTMLElement | undefined = $state();

	// onMount(() => {
	// 	// I think we only need this if we have a menu
	// 	// if (navMenuData?.length) {
	// 	document.addEventListener('click', documentClickHandler);
	// 	// }
	// 	return () => {
	// 		document.removeEventListener('click', documentClickHandler);
	// 	};
	// });

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
		// console.log('navMenuTriggerClickHandler', menuVisible);
		menuVisible = !menuVisible;
	};

	// TODO: move this into the Menu component
	const documentClickHandler = (event: MouseEvent) => {
		const compPath = event.composedPath();
		let insideNav = false;

		if (navBarEl) {
			insideNav = compPath.includes(navBarEl);
		}

		if (!insideNav && navBarMenuEl) {
			insideNav = compPath.includes(navBarMenuEl);
		}

		// console.log(compPath);
		// console.log( `Click was${insideNav ? '' : ' **NOT**'} inside NavBar component` );

		if (!insideNav) {
			menuVisible = false;
		}
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

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'fixed',
		placement: 'top-start',
		middleware: [offset(10), flip(), shift()],
	});
</script>

<!-- This is not good since it triggers for each instance of the nav bar -->
<svelte:document onclick={documentClickHandler} />

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
			use:floatingRef
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
		class="sp-nav--menu"
		use:floatingContent>
		<Menu
			data={navMenuData}
			onMenuClick={menuClickHandler} />
	</div>
{/if}

<style>
	.sp-nav--icon {
		/* don't allow icons to receive target */
		pointer-events: none;
	}
</style>
