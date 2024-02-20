<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type ButtonMode =
		| 'primary'
		| 'light'
		| 'accent'
		| 'accent-alt1'
		| 'accent-alt2'
		| 'accent-alt3'
		| 'outline';

	export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
		mode?: ButtonMode;
		disabled?: boolean;
		loader?: boolean;
		round?: boolean;
		block?: boolean;
		action?: boolean;
		type?: 'button' | 'submit' | 'reset';
		form?: string;
		size?: 'small' | 'medium' | 'large';
		onButtonClick?: (event: ComponentEvent<undefined>) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ComponentEvent } from './';
	let {
		mode = 'primary', // commonly used mode
		disabled,
		loader,
		round,
		block,
		action,
		type = 'button', // commonly used type
		form,
		size = 'medium', // most use cases are medium
		onButtonClick,
		children,
		...attr
	} = $props<ButtonProps>();

	const buttonClickHandler = (event: MouseEvent) => {
		if (typeof onButtonClick === 'function') {
			const componentEvent = new ComponentEvent(
				undefined,
				event.target!,
				event
			);
			onButtonClick(componentEvent);
		}
	};
</script>

<button
	{...attr}
	{type}
	{disabled}
	{form}
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
