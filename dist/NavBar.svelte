<script
	context="module"
>import { Icon } from "./index";
</script>

<script>import { Menu } from "./index";
import { createEventDispatcher } from "svelte";
export let data = [];
export let navMenuData = [];
export let vertical = false;
$:
  menuVisible = false;
const dispatchLink = createEventDispatcher();
const dispatchMenu = createEventDispatcher();
const navLinkClickHandler = (e) => {
  const target = e.target;
  if (target.href) {
    window.location.href = target.href;
  } else {
    dispatchLink("nav-link", target.id);
  }
};
const navMenuTriggerClickHandler = () => {
  menuVisible = !menuVisible;
};
const hideMenuOnBodyClick = (e) => {
  const target = e.target;
  if (target.closest(".sp-nav--menu-trigger") || target.closest(".sp-menu")) {
    return;
  }
  menuVisible = false;
};
const menuClickHandler = (e) => {
  menuVisible = false;
  dispatchMenu("click", e.detail);
};
const menuUpdateHandler = (e) => {
  dispatchMenu("update", e.detail);
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

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
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
  padding: 1.125rem;
}

.sp-nav--vertical {
  flex-direction: column;
}</style>
