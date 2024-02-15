<script
	lang="ts"
	context="module">
	export type ButtonMode =
		| 'primary'
		| 'light'
		| 'accent'
		| 'accent-alt1'
		| 'accent-alt2'
		| 'accent-alt3'
		| 'outline';

	export type ButtonProps = {
		mode?: ButtonMode;
		disabled?: boolean;
		loader?: boolean;
		round?: boolean;
		block?: boolean;
		action?: boolean;
		type?: 'button' | 'submit' | 'reset';
		form?: string;
		size?: 'small' | 'medium' | 'large';
		onButtonClick?: (e: MouseEvent) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
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
	} = $props<ButtonProps>();
</script>

<button
	{type}
	{disabled}
	{form}
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:sp-button--round={round}
	class:sp-button--loader={loader}
	class:sp-button--block={block}
	class:sp-button--action={action}
	onclick={onButtonClick}>
	<span class="sp-button--label">
		{#if children}
			{@render children()}
		{/if}
	</span>
</button>
