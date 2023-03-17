<script lang="ts">
	import { Icon, Button } from './index';
	import { onMount } from 'svelte';

	export let items = [];
	let expandedItems = [];

	// current level should show an index of the array and only render everything that is in that lvl
	function clickHandler(event: MouseEvent) {
		setExpandItems(items, event.target.id);
		console.log(expandedItems);
	}

	function isRoot(id) {
		for (const item of items) {
			if (item.id === id) {
				return true;
			}
		}
		return false;
	}

	function setExpandedItems(items, id) {
		for (const item of items) {
			if (item.id === id && item.items && item.items.length) {
				expandedItems = item.items;
				return;
			}
			if (item.items && items.items.length) {
				setExpandedItems(item.items, id);
			}
		}
	}
</script>

<ul class="sp-menu-list">
	{#each expandedItems as expandedItem}
		{#if !isRoot(expandedItem.id)}
			<Button>back</Button>
		{/if}
		<li class="sp-menu-list-item">
			{expandedItem.name}
			{#if expandedItem.items}
				<Icon icon="chevron-down" />
			{/if}
		</li>{/each}
</ul>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-menu--list {
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

		&.sp-menu--list-item--expanded {
			background-color: $color--pink;
		}
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sp-menu--button--icon {
		margin-left: 0.5rem;
	}
</style>
