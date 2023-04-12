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
	import { Menu, type MenuData } from './Menu.svelte';
	import { createEventDispatcher } from 'svelte';
	export let data: NavBarData[] = [];
	export let menuData: MenuData[] = [];
	let showMenu = false;

	const dispatchLink: (name: string, detail: string) => boolean =
		createEventDispatcher();

	const navLinkClickHandler = (e: MouseEvent) => {
		const target = e.target as HTMLLinkElement;
		if (target.href.length) {
			window.location.href = target.href;
		}
		dispatchLink('nav-link', target.id);
	};

	const navMenuTriggerClickHandler = (e: MouseEvent) => {
		showMenu = !showMenu;
	};
</script>

//if no link dispatch id if there is a link d oa link
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

	{#if menuData?.length}
		<a
			class="sp-nav-menu-trigger"
			href="#"
			on:click|preventDefault={navMenuTriggerClickHandler}>
			<Icon name="ellipsis" />
		</a>
		{#if showMenu}
			<Menu data={menuData} />
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
</style>
