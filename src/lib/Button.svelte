<script
	lang="ts"
	context="module">
	export const BUTTON_MODES = {
		primary: 'primary',
		light: 'light',
		accent: 'accent',
		accent_alt_1: 'accent-alt1',
		accent_alt_2: 'accent-alt2',
		accent_alt_3: 'accent-alt3',
		outline: 'outline',
	} as Record<string, string>;

	export type ButtonProps = {
		mode?: string;
		disabled?: boolean;
		loader?: boolean;
		round?: boolean;
		block?: boolean;
		action?: boolean;
		type?: 'button' | 'submit' | 'reset';
		form?: string | null;
		size?: 'small' | 'medium' | 'large';
		onclick: (e: MouseEvent) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		mode = BUTTON_MODES.primary,
		disabled = false,
		loader = false,
		round = true,
		block = false,
		action = false,
		type = 'button',
		form = null,
		size = 'medium',
		onclick,
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
	{onclick}>
	<span class="sp-button--label">
		{#if children}
			{@render children()}
		{/if}
	</span>
</button>
