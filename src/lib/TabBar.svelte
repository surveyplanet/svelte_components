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
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatchTabButton = createEventDispatcher<{
		tabButton: TabBarData['id'];
	}>();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let grow = false;
	export let data: TabBarData[] = [];

	let activeIndicator: HTMLDivElement;

	onMount(() => {
		const selected = data.find((item) => item.selected);
		if (selected) {
			selectTabButton(
				document.getElementById(selected.id) as HTMLButtonElement
			);
		}
	});

	const selectTabButton = (target: HTMLButtonElement) => {
		const id = target.id;
		const { width, left } = target.getBoundingClientRect();

		data = data.map((item) => {
			item.selected = item.id === id;
			return item;
		});

		activeIndicator.style.width = `${width}px`;
		activeIndicator.style.left = `${left}px`;

		dispatchTabButton('tabButton', id);
	};

	const tabButtonHandler = (event: Event) => {
		const target = (event.target as HTMLElement).closest('button');
		selectTabButton(target!);
	};
</script>

<nav
	class="sp-tab-bar"
	class:sp-tab-bar--grow={grow}
	{id}>
	<div
		class="sp-tab-bar--active-indicator"
		bind:this={activeIndicator} />

	<ul>
		{#each data as item}
			<li>
				<button
					id={item.id}
					class="sp-tab-bar--button"
					class:sp-tab-bar--item--active={item.selected}
					disabled={item.disabled}
					on:click|preventDefault={tabButtonHandler}>
					{#if item.label}
						<span class="sp-tab-bar--button--label">
							{item.label}
						</span>
					{/if}
					{#if item.html}
						<span class="sp-tab-bar--button--html">
							{item.html}
						</span>
					{/if}
					{#if item.icon}
						<Icon
							name={item.icon}
							size={16} />
					{/if}
				</button>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	$indicator--speed: 0.5s;

	.sp-tab-bar {
		display: inline-block;
		height: $size--36;
		padding: $size--4;
		font: $font--default;
		font-size: $size--14;
		background-color: $color--beige-dark;
		border-radius: 100px;
		width: auto;
		&.sp-tab-bar--grow {
			display: block;
			ul {
				justify-content: space-between;
			}
		}
	}

	.sp-tab-bar--active-indicator {
		display: block;
		position: absolute;
		top: 4px;
		left: 0;
		height: $size--28;
		border-radius: $size--36;
		width: 0; // start off with no width
		background-color: $color--white;
		z-index: 0;
		transition: left 0.2s ease-out, width 0.2s ease-out;
	}

	ul {
		position: relative;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;
		align-content: stretch;
		list-style: none;
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		z-index: 1;
	}

	li {
		margin: 0;
		padding: 0;
	}

	button {
		display: flex; // inline-flex
		justify-content: center;
		align-items: center;
		gap: $size-gutter--quarter;
		cursor: pointer;
		margin: 0;
		padding: 0 $size-gutter;
		border: none;
		height: 100%;
		font: inherit;
		background: none;
		&:disabled {
			pointer-events: none;
			color: $color--beige-darkest;
			:global(svg path) {
				stroke: $color--beige-darkest;
			}
		}
	}
</style>
