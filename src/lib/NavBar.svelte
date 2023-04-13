<script
	context="module"
	lang="ts">
	import { Icon, type IconName } from './index';

	export interface NavBarData {
		icon: IconName;
		link?: string;
		title?: string;
		id: string;
	}
</script>

<script lang="ts">
	import { Menu, type MenuData } from './index';
	import { createEventDispatcher } from 'svelte';
	export let data: NavBarData[] = [];
	export let navMenuData: MenuData[] = [];
	let showMenu = false;

	const dispatchLink: (name: string, detail: string) => boolean =
		createEventDispatcher();

	const navLinkClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (target.href.length) {
			window.location.href = target.href;
		} else {
			dispatchLink('nav-link', target.id);
		}
	};

	const navMenuTriggerClickHandler = () => {
		showMenu = !showMenu;
	};
</script>

<nav class="sp-nav">
	{#each data as item}
		<a
			class="sp-nav-link"
			href={item.link}
			id={item.id}
			on:click|preventDefault={navLinkClickHandler}>
			{#if item.title}
				{item.title}
			{/if}

			<Icon name={item.icon} /></a>
	{/each}

	{#if navMenuData?.length}
		<a
			class="sp-nav-menu-trigger"
			href="#"
			on:click|preventDefault={navMenuTriggerClickHandler}>
			<Icon name="ellipsis" />
		</a>
		{#if showMenu}
			<div class="sp-nav-menu">
				<Menu data={navMenuData} />
			</div>
		{/if}
	{/if}
</nav>

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

	.sp-nav-menu {
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 1;
		width: 100%;
	}
</style>
