<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type ModalProps = HTMLAttributes<HTMLDivElement> & {
		title?: string;
		subtitle?: string;
		fullscreen?: boolean;
		overlay?: boolean;
		visible?: boolean;
		animationMilliseconds?: number;
		size?: 'small' | 'medium' | 'large';
		onModalIntroStart?: (event: CustomEvent) => void;
		onModalIntroEnd?: (event: CustomEvent) => void;
		onModalOutroStart?: (event: CustomEvent) => void;
		onModalOutroEnd?: (event: CustomEvent) => void;
		footer?: Snippet;
		body?: Snippet;
		header?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from './';

	let {
		title,
		subtitle,
		fullscreen,
		overlay,
		visible,
		animationMilliseconds = 350, // speed should have a fallback value
		size = 'medium', // medium is the most common size
		onModalIntroStart,
		onModalIntroEnd,
		onModalOutroStart,
		onModalOutroEnd,
		footer,
		header,
		body,
		...attr
	}: ModalProps = $props();

	const overlayClickHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			visible = false;
		}
	};

	const closeHandler = () => {
		visible = false;
	};
</script>

<svelte:window onkeydown={overlayClickHandler} />

{#if overlay && visible}
	<div
		role="button"
		tabindex="0"
		class="sp-modal--overlay"
		transition:fade
		onclick={closeHandler}
		onkeydown={overlayClickHandler} />
{/if}
{#if visible}
	<div
		{...attr}
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		class="sp-modal sp-modal--{size}"
		onintrostart={onModalIntroStart}
		onintroend={onModalIntroEnd}
		onoutrostart={onModalOutroStart}
		onoutroend={onModalOutroEnd}
		class:sp-modal--fullscreen={fullscreen}>
		<button
			onclick={closeHandler}
			class="sp-modal--header--close-btn">
			<Icon
				name="x"
				strokeWidth={3}
				size={16} />
		</button>
		<header class="sp-modal--header">
			{#if title?.length}
				<h3 class="sp-modal--header--title">{title}</h3>
			{/if}
			{#if subtitle?.length}
				<h4 class="sp-modal--header--subtitle">{subtitle}</h4>
			{/if}
			{#if header}
				{@render header()}
			{/if}
		</header>
		<div class="sp-modal--body">
			{#if body}
				{@render body()}
			{/if}
		</div>
		<footer class="sp-modal--footer">
			{#if footer}
				{@render footer()}
			{/if}
		</footer>
	</div>
{/if}
