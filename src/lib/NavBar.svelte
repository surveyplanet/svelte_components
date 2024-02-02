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
		onnavlink?: (navLink: string) => void;
		onClick?: (id: string) => void;
		onUpdate?: (id: string) => void;
	};
</script>

<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';

	import { Menu, type MenuData } from './index';

	let {
		data,
		navMenuData,
		vertical = false,
		onnavlink,
		onClick,
		onUpdate,
	} = $props<NavBarProps>();

	let menuVisible = $state(false);

	const navLinkClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (target.href) {
			window.location.href = target.href;
			if (onnavlink) onnavlink(target.id);
		}
	};

	const navMenuTriggerClickHandler = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('click', menuVisible);
		menuVisible = !menuVisible;
	};

	const hideMenuOnBodyClick = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (
			target.closest('.sp-nav--menu-trigger') ||
			target.closest('.sp-menu')
		) {
			return;
		}
		menuVisible = false;
	};

	const menuClickHandler = (id: string) => {
		menuVisible = false;
		if (onClick) onClick(id);
	};

	const menuUpdateHandler = (id: string) => {
		if (onUpdate) onUpdate(id);
	};
	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'fixed',
		placement: 'top-start',
		middleware: [offset(10), flip(), shift()],
	});
</script>

<svelte:window onclick={hideMenuOnBodyClick} />

<nav
	class="sp-nav"
	class:sp-nav--vertical={vertical}>
	{#each data as item}
		<a
			class="sp-nav--link"
			href={item.link}
			id={item.id}
			title={item.title}
			onClick={navLinkClickHandler}>
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
			onClick={navMenuTriggerClickHandler}>
			<Icon
				name="ellipsis"
				size={16} />
		</button>
	{/if}
</nav>
{#if menuVisible}
	<div
		class="sp-nav--menu"
		use:floatingContent>
		<Menu
			data={navMenuData}
			onMenuClick={menuClickHandler}
			onMenuUpdate={menuUpdateHandler} />
	</div>
{/if}

<style>
	.sp-nav--icon {
		pointer-events: none;
	}
</style>
