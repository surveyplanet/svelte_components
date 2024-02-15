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

	export type TabBarProps = {
		block?: boolean;
		defaultIndicatorWidth?: number;
		defaultIndicatorX?: number;
		data: TabBarData[];
		onTabClick?: (event: ComponentEvent<string>) => void;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { ComponentEvent } from '$lib';

	let { block, defaultIndicatorWidth, defaultIndicatorX, data, onTabClick } =
		$props<TabBarProps>();

	let activeIndicator: HTMLDivElement | null = $state(null);

	onMount(() => {
		const selected = data?.find((item) => item.selected);
		if (selected) {
			selectTabButton(
				document.getElementById(selected.id) as HTMLButtonElement,
				false
			);
		}
	});

	const moveIndicator = (target: HTMLButtonElement, animate = false) => {
		const left = target.offsetLeft;
		const width = target.offsetWidth;
		const parent = target.closest('.sp-tab-bar') as HTMLElement;
		const offset = Number(
			getComputedStyle(parent)
				.getPropertyValue('padding-left')
				.replace('px', '')
		);

		if (activeIndicator) {
			if (animate) {
				activeIndicator.style.transitionProperty = 'left, width';
			} else {
				activeIndicator.style.transitionProperty = 'none';
			}
			activeIndicator.style.width = `${width}px`;
			activeIndicator.style.left = `${left + offset}px`;
		}
	};

	const selectTabButton = (target: HTMLButtonElement, animate: boolean) => {
		const id = target.id;
		moveIndicator(target, animate);

		data = (data ?? []).map((item) => {
			item.selected = item.id === id;
			return item;
		});
	};

	const tabButtonHandler = (event: Event) => {
		event.preventDefault();
		const target = (event.target as HTMLElement).closest('button');
		selectTabButton(target!, true);

		if (typeof onTabClick === 'function') {
			const componentEvent = new ComponentEvent<string>(
				target!.id,
				target!,
				event
			);
			onTabClick(componentEvent);
		}
	};
	//TODO see if we can get rid of this function
	const windowResizeHandler = () => {
		const selected = data?.find((item) => item.selected);
		if (selected) {
			selectTabButton(
				document.getElementById(selected.id) as HTMLButtonElement,
				true
			);
		}
	};
</script>

<svelte:window on:resize={windowResizeHandler} />

<nav
	class="sp-tab-bar"
	class:sp-tab-bar--block={block}>
	<div
		class="sp-tab-bar--active-indicator"
		style:width={`${defaultIndicatorWidth ? defaultIndicatorWidth + 'px' : void 0}`}
		style:left={`${defaultIndicatorX ? defaultIndicatorX + 'px' : void 0}`}
		bind:this={activeIndicator} />

	<ul>
		{#each data ?? [] as item}
			<li>
				<button
					id={item.id}
					class="sp-tab-bar--button"
					class:sp-tab-bar--item--active={item.selected}
					disabled={item.disabled}
					onclick={tabButtonHandler}>
					{#if item.label}
						<span class="sp-tab-bar--button--label">
							{item.label}
						</span>
					{:else if item.html}
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
