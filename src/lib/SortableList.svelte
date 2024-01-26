<script
	lang="ts"
	context="module">
	import { Icon, type IconName } from './index';
	export interface SortListData {
		label: string;
		meta?: string;
		image?: string;
		icon?: IconName;
	}

	export type CustomDragEventTarget = HTMLElement & {
		dataset: DOMStringMap & { index: string; id: string };
		index: string;
	};

	export type SortListProps = {
		data: SortListData[];
		sort: (data: SortListData[]) => void;
	};
</script>

<script lang="ts">
	// on first load the list is not working properly
	// works after browser window reset

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let { data, sort } = $props<SortListProps>();
	// $: data = data;

	// FLIP ANIMATION
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			};
		},
	});

	const reorder = (from: number, to: number) => {
		let newList = [...data];
		newList[from] = [newList[to], (newList[to] = newList[from])][0];
		data = newList;
		sort(newList);
	};

	let isOver: boolean | string = $state(false);
	const getDraggedParent = (
		node: CustomDragEventTarget
	):
		| CustomDragEventTarget
		| (DOMStringMap & { index: string; id: string }) => {
		if (node.dataset?.index) {
			return node.dataset;
		} else {
			return getDraggedParent(node.parentNode as CustomDragEventTarget);
		}
	};

	const listItemDragStartHandler = (event: DragEvent) => {
		if (event.target && event.dataTransfer) {
			let target = event.target as CustomDragEventTarget;
			event.dataTransfer.setData('source', target.dataset.index);
		}
	};
	const listItemDragOverHandler = (event: DragEvent) => {
		event.preventDefault();
		if (event.target) {
			let dragged = getDraggedParent(
				event.target as CustomDragEventTarget
			);
			if (isOver !== dragged.id) isOver = JSON.parse(dragged.id);
		}
	};
	const listItemDragLeaveHandler = (event: DragEvent) => {
		if (event.target) {
			let dragged = getDraggedParent(
				event.target as CustomDragEventTarget
			);
			if (isOver === dragged.id) isOver = false;
		}
	};
	const listItemDragDropHandler = (event: DragEvent) => {
		isOver = false;
		event.preventDefault();
		if (event.target && event.dataTransfer) {
			let dragged = getDraggedParent(
				event.target as CustomDragEventTarget
			);
			let from = parseInt(event.dataTransfer.getData('source'));
			let to = parseInt(dragged.index);
			reorder(from, to);
		}
	};

	//TODO: add |global to transitions once it is fixed in svelte 5
</script>

<ul class="sp--sortable-list">
	{#if data?.length}
		{#each data as item, index (item)}
			<li
				class="sp-sortable-list--list-item"
				data-index={index}
				data-id={JSON.stringify(item)}
				draggable="true"
				ondragstart={listItemDragStartHandler}
				ondragover={listItemDragOverHandler}
				ondragleave={listItemDragLeaveHandler}
				ondrop={listItemDragDropHandler}
				in:receive={{ key: item.label }}
				out:send={{ key: item.label }}
				animate:flip={{ duration: 300 }}
				class:float={isOver}>
				<p class="sp-sortable-list--list-item-label">
					{item.label}
				</p>
				{#if item.meta}
					<span class="sp-sortable-list--list-item-meta">
						{item.meta}
					</span>
				{/if}
				{#if item.image}
					<img
						class="sp-sortable-list--list-item-image"
						src={item.image}
						alt={item.label} />
				{/if}
				{#if item.icon}
					<Icon name={item.icon} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
	}
	li {
		border: 2px dotted transparent;
		transition: border 0.1s linear;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.img {
			width: 100%;
			height: auto;
			pointer-events: none;
		}
	}
</style>
