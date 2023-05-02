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
	import { Menu, type MenuData } from './index';
	import { createEventDispatcher } from 'svelte';
	export let data: NavBarData[] = [];
	export let navMenuData: MenuData[] = [];
	export let vertical = false;
	$: menuVisible = false;

	const dispatchLink: (name: string, detail: string) => boolean =
		createEventDispatcher();
	const dispatchMenu: (name: string, detail: string) => boolean =
		createEventDispatcher();

	const navLinkClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (target.href) {
			window.location.href = target.href;
		} else {
			dispatchLink('nav-link', target.id);
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
		dispatchMenu('click', e.detail);
	};

	const menuUpdateHandler = (e: CustomEvent) => {
		dispatchMenu('update', e.detail);
	};
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
			<Icon name={item.icon} /></a>
	{/each}

	{#if navMenuData?.length}
		<a
			class="sp-nav--menu-trigger"
			href="c"
			on:click|preventDefault={navMenuTriggerClickHandler}>
			<Icon name="ellipsis" />
		</a>
	{/if}
</nav>

{#if menuVisible}
	<Menu
		data={navMenuData}
		on:click={menuClickHandler}
		on:update={menuUpdateHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	nav {
		display: flex;
		max-width: fit-content;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: $size--18;
	}
	.sp-nav--vertical {
		flex-direction: column;
	}
</style>
