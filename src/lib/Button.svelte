<script
	lang="ts"
	context="module">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	export type ButtonMode =
		| 'primary'
		| 'light'
		| 'accent'
		| 'accent-alt1'
		| 'accent-alt2'
		| 'accent-alt3'
		| 'outline';

	export type ButtonProps = HTMLButtonAttributes & {
		mode?: ButtonMode;
		loader?: boolean;
		round?: boolean;
		block?: boolean;
		action?: boolean;
		size?: 'small' | 'medium' | 'large';
		onButtonClick?: (
			event: ComponentEvent<undefined, HTMLButtonElement>
		) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ComponentEvent } from './';
	let {
		mode = 'primary', // commonly used mode
		loader,
		round,
		block,
		action,
		size = 'medium', // most use cases are medium
		onButtonClick,
		children,
		...attr
	}: ButtonProps = $props();

	const buttonClickHandler = (event: MouseEvent) => {
		if (typeof onButtonClick === 'function') {
			const componentEvent = new ComponentEvent(
				undefined,
				event.target as HTMLButtonElement,
				event
			);
			onButtonClick(componentEvent);
		}
	};
</script>

<button
	{...attr}
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:sp-button--round={round}
	class:sp-button--loader={loader}
	class:sp-button--block={block}
	class:sp-button--action={action}
	onclick={buttonClickHandler}>
	<span class="sp-button--label">
		{#if children}
			{@render children()}
		{/if}
	</span>
</button>
