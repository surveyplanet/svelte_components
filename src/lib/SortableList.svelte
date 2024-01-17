<script
	lang="ts"
	context="module">
	import { Icon, type IconName } from './index';
	export interface ListData {
		name: string;
		meta?: string;
		image?: string;
		icon?: IconName;
	}

	export type CustomDragEventTarget = HTMLElement & {
		dataset: DOMStringMap & { index: string; id: string };
		index: string;
	};
</script>

<script lang="ts">
	// on first load the list is not working properly
	// works after browser window reset

	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	const dispatch = createEventDispatcher<{
		sort: ListData[];
	}>();
	export let data: ListData[];

	$: data = data;

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
		console.log(data);
		dispatch('sort', newList);
	};

	let isOver: boolean | string = false;
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
</script>

<ul class="sp--sortable-list">
	{#if data?.length}
		{#each data as item, index (item)}
			<li
				class="sp-sortable-list--list-item"
				data-index={index}
				data-id={JSON.stringify(item)}
				draggable="true"
				on:dragstart={listItemDragStartHandler}
				on:dragover={listItemDragOverHandler}
				on:dragleave={listItemDragLeaveHandler}
				on:drop={listItemDragDropHandler}
				in:receive|global={{ key: item.name }}
				out:send|global={{ key: item.name }}
				animate:flip={{ duration: 300 }}
				class:float={isOver}>
				<slot
					{item}
					{index}>
					<p class="sp-sortable-list--list-item-name">{item.name}</p>
					{#if item.meta}
						<span class="sp-sortable-list--list-item-meta">
							{item.meta}
						</span>
					{/if}
					{#if item.image}
						<img
							class="sp-sortable-list--list-item-image"
							src={item.image}
							alt={item.name} />
					{/if}
					{#if item.icon}
						<Icon name={item.icon} />
					{/if}
				</slot>
			</li>
		{/each}
	{/if}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		border: 2px dotted transparent;
		transition: border 0.1s linear;
	}
	.float {
		border-color: rgba(48, 12, 200, 0.2);
		box-shadow: 0 0 0 5px rgba(00, 00, 00, 0.1);
	}
</style>
