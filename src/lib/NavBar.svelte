<script
	context="module"
	lang="ts">
	import { Icon, type IconName } from './index';

	export interface NavBarData {
		icon: IconName;
		link?: string;
		title: string;
		id: string;
	}

	export type NavBarProps = {
		data: NavBarData[];
		navMenuData?: MenuData[];
		vertical?: boolean;
		onNavClick?: (id: string) => void;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { Menu, type MenuData } from './index';

	let {
		data,
		navMenuData,
		vertical = false,
		onNavClick,
	} = $props<NavBarProps>();

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

	const navButtonClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (target.href?.length) {
			window.location.href = target.href;
		} else {
			e.preventDefault();
			e.stopPropagation();
			if (typeof onNavClick === 'function') {
				onNavClick(target.id);
			}
		}
	};

	const navMenuTriggerClickHandler = (e: Event) => {
		e.preventDefault();
		// e.stopPropagation();
		menuVisible = !menuVisible;
	};

	const documentClickHandler = (event: MouseEvent) => {
		const compPath = event.composedPath();
		const insideNav = compPath.includes(navBarEl!);

		if (navBarMenuEl) {
			compPath.includes(navBarMenuEl);
		}

		// console.log(compPath);
		// console.log( `Click was${insideNav ? '' : ' **NOT**'} inside NavBar component` );

		if (!insideNav) {
			menuVisible = false;
		}
	};

	const menuClickHandler = (id: string) => {
		menuVisible = false;
		if (onNavClick) onNavClick(id);
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

{#if menuVisible}
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

	button {
		background-color: red;
	}
</style>
