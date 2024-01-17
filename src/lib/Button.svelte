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
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchClick = createEventDispatcher<{ click: MouseEvent }>();

	/**
	 * A Button Component
	 * @component
	 */

	/**
	 * The button mode. See BUTTON_MODES.
	 */
	export let mode = BUTTON_MODES.primary;

	/**
	 * Whether the button is disabled or not
	 */
	export let disabled = false;

	/**
	 * Whether the button should show a loader animation when disabled
	 */
	export let loader = false;

	/**
	 * Whether the left and right edges should be rounded off
	 */
	export let round = true;

	/**
	 * Whether the button should consume all available horizontal space.
	 */
	export let block = false;

	/**
	 * Whether the button should render as a square action button.
	 */
	export let action = false;

	/**
	 * The type of button
	 */
	export let type: 'button' | 'submit' | 'reset' = 'button';

	/**
	 * The id of a Form element to associate the button.
	 */
	export let form: string | null = null;

	/**
	 * The button size, either: 'small', 'medium' or 'large'
	 * @required
	 */
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const clickHandler = (e: MouseEvent): void => {
		dispatchClick('click', e);
	};
</script>

<button
	{type}
	{disabled}
	{form}
	{...$$restProps}
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:sp-button--round={round}
	class:sp-button--loader={loader}
	class:sp-button--block={block}
	class:sp-button--action={action}
	on:click={clickHandler}>
	<span class="sp-button--label"><slot /></span>
</button>
