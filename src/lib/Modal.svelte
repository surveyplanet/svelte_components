<script
	lang="ts"
	context="module">
	export type ModalProps = {
		title?: string;
		subtitle?: string;
		fullscreen?: boolean;
		overlay?: boolean;
		visible?: boolean;
		animationMilliseconds?: number;
		size?: 'small' | 'medium' | 'large';
		onintrostart?: (e: CustomEvent) => void;
		onintroend?: (e: CustomEvent) => void;
		onoutrostart?: (e: CustomEvent) => void;
		onoutroend?: (e: CustomEvent) => void;
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
		title = 'Modal',
		subtitle = 'Subtitle',
		fullscreen = false,
		overlay = true,
		visible = false,
		animationMilliseconds = 350,
		size = 'medium',
		onintrostart,
		onintroend,
		onoutrostart,
		onoutroend,
		footer,
		header,
		body,
	} = $props<ModalProps>();

	const overlayClickHandler = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
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
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		class="sp-modal sp-modal--{size}"
		{onintrostart}
		{onintroend}
		{onoutrostart}
		{onoutroend}
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
