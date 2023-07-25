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
			class="sp-nav--menu-trigger"
			on:click|preventDefault={navMenuTriggerClickHandler}>
			<Icon
				name="ellipsis"
				size={16} />
		</button>
	{/if}
</nav>
{#if menuVisible}
	<!-- TODO: This needs to be positioned correctly with library like: https://floating-ui.com -->
	<div class="sp-nav--menu">
		<Menu
			data={navMenuData}
			on:click={menuClickHandler}
			on:update={menuUpdateHandler} />
	</div>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	nav {
		position: relative;
		display: flex;
		max-width: fit-content;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: $size--32;
		overflow: visible;
		// background-color: purple;
		&.sp-nav--vertical {
			flex-direction: column;
		}

		a,
		button {
			cursor: pointer;
			box-sizing: border-box;
			background-color: transparent;
			width: $size--16;
			height: $size--16;
			margin: 0;
			padding: 0;
			border: none;
			&:hover {
				// background-color: $color--pink;
				:global(path) {
					stroke: $color--beige-darkest;
				}
			}
		}
	}
</style>
