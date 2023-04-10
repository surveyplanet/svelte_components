<script
	lang="ts"
	context="module">
	import { Icon, type IconName } from './index';
	export interface TabBarData {
		id: string;
		label?: string;
		html?: string;
		icon?: IconName;
		selected?: boolean;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch: (name: string, id: string) => boolean =
		createEventDispatcher();

	/**
	 * Tab bar id
	 */

	export let id: string = (Date.now() + Math.random()).toString(36);
	/**
	 * Force tab to consume all available space
	 */
	export let grow = false;

	/**
	 * Objects to pass to the tab buttons
	 */
	export let data: TabBarData[] = [];

	const selectTabButton = (event: Event) => {
		const target = event.target as HTMLElement;
		const id = target.closest('li')?.id;

		for (let item of data) {
			console.log(id);
			if (!item.disabled) {
				if (item.id === id) {
					item.selected = true;
					dispatch('tabButton', id);
				} else {
					item.selected = false;
				}
			}
		}
	};

	const tabButtonHandler = (event: Event) => {
		selectTabButton(event);
	};
</script>

<ul
	class="sp-tab-bar"
	class:sp-tab-bar--grow={grow}
	{id}>
	{#each data as item}
		<li
			class="sp-tab-bar--item"
			id={item.id}
			class:sp-tab-bar--item--active={item.selected}>
			<button
				class="sp-tab-bar--button"
				class:sp-tab-bar--button--disabled={item.disabled}
				on:click={tabButtonHandler}>
				{#if item.label}
					<span class="sp-tab-bar--label">{item.label}</span>
				{/if}
				{#if item.html}
					<span class="sp-tab-bar--html">{item.html}</span>
				{/if}
				{#if item.icon}
					<Icon name={item.icon} />
				{/if}
			</button>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-tab-bar {
		font: $font-family--default;
		position: relative; /* add this */
	}

	ul {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;
		align-content: stretch;
		list-style: none;
		margin: 0;
		padding: 0;
		background-color: $color--light-purple-light;
		border-radius: 100px;
		position: relative; /* add this */
	}

	li {
		display: flex;
		margin: 0;
		padding: 0;
	}

	.sp-tab-bar--label {
		margin: 0;
		padding: 0 8px;
	}

	button {
		display: flex;
		margin: 0;
		padding: 14px 16px;
		border: none;
		background: none;
		color: inherit;
		font: inherit;
		line-height: inherit;
		cursor: pointer;
		justify-content: flex-start;
		align-items: center;
		align-content: stretch;
	}

	button:focus {
		outline: none;
	}

	button:hover {
		background-color: white;
		border-radius: 100px;
	}

	.sp-tab-bar--button--disabled {
		cursor: not-allowed;
		background-color: $color--slate-lighter;
		border-radius: 100px;
	}

	.sp-tab-bar--button--disabled:hover {
		background-color: $color--slate-lighter;
	}

	.sp-tab-bar--grow {
		li {
			flex-grow: 1;
		}
	}
</style>
