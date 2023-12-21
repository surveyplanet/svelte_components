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
</script>

<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';

	import { Menu, type MenuData } from './index';
	import { createEventDispatcher } from 'svelte';

	export let data: NavBarData[] = [];
	export let navMenuData: MenuData[] = [];
	export let vertical = false;
	$: menuVisible = false;

	const dispatchLink = createEventDispatcher<{
		navLink: string;
	}>();

	const dispatchClick = createEventDispatcher<{
		click: CustomEvent['detail'];
	}>();

	const dispatchUpdate = createEventDispatcher<{
		update: CustomEvent['detail'];
	}>();

	const navLinkClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (target.href) {
			window.location.href = target.href;
		} else {
			dispatchLink('navLink', target.id);
		}
	};

	const navMenuTriggerClickHandler = () => {
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

	const menuClickHandler = (e: CustomEvent) => {
		menuVisible = false;
		dispatchClick('click', e.detail);
	};

	const menuUpdateHandler = (e: CustomEvent) => {
		dispatchUpdate('update', e.detail);
	};
	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'fixed',
		placement: 'top-start',
		middleware: [offset(10), flip(), shift()],
	});
</script>

<svelte:window on:click={hideMenuOnBodyClick} />

<nav
	class="sp-nav"
	class:sp-nav--vertical={vertical}>
	{#each data as item}
		<a
			class="sp-nav--link"
			href={item.link}
			id={item.id}
			title={item.title}
			on:click|preventDefault={navLinkClickHandler}>
			<Icon
				name={item.icon}
				size={16} />
		</a>
	{/each}

	{#if navMenuData?.length}
		<button
			use:floatingRef
			class="sp-nav--menu-trigger"
			on:click|preventDefault={navMenuTriggerClickHandler}>
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
			on:click={menuClickHandler}
			on:update={menuUpdateHandler} />
	</div>
{/if}
