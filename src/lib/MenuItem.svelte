<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let name = 'Menu Item';
	export let icon = 'search';
	export let id = 'default';

	const menuItemHandler = (e: Event): void => {
		if (e.type === 'click') {
			dispatch('menuItemClick', e);
		}
		if (e.type === 'keydown') {
			if (e.key === 'Enter' || e.key === ' ') {
				dispatch('menuItemClick', e);
			}
		}
	};

	let attribute = '';
	$: selected = false;
</script>

<a
	class="sp-menu--item {attribute}"
	on:click={menuItemHandler}
	on:keydown={menuItemHandler}
	class:sp-menu--item--selected={selected}
	{id}>
	{name}
	{#if icon}
		<Icon name={icon} />
	{/if}
</a>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-menu--item {
		display: flex;
		align-items: center;
		border: 1px solid;
		padding: 0.5rem 1rem;
		cursor: pointer;
		background-color: $color--blue-dark;
		color: $color--white;
		border-radius: $size-radius--default;
		border-color: $color--blue-dark;
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: $color--blue;
		}

		&:focus {
			outline: none;
			background-color: $color--blue;
		}

		&.expanded {
			background-color: $color--blue;
		}
	}
</style>
