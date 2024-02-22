<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { ComponentEvent } from './';

	export type ToggleProps = HTMLAttributes<HTMLInputElement> & {
		on?: boolean;
		name?: string;
		disabled?: boolean;
		tall?: boolean;
		label?: string;
		prependLabel?: boolean;
		onToggleChange?: (event: ComponentEvent<boolean>) => void;
	};
</script>

<script lang="ts">
	// import { omitProps } from '@surveyplanet/utilities';
	let {
		on = false,
		name,
		disabled,
		tall,
		label,
		prependLabel,
		onToggleChange,
		...attr
	} = $props<ToggleProps>();

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}

		if (typeof onToggleChange === 'function') {
			const componentEvent = new ComponentEvent(on, event.target!, event);
			onToggleChange(componentEvent);
		}
	};
</script>

{#snippet toggleLabel()}
	<label
		class="sp-toggle--label"
		class:sp-toggle--label-prepend={prependLabel}
		class:sp-toggle--label--disabled={disabled}
		for={attr.id}>{label}</label>
{/snippet}

{#if label?.length && prependLabel}
	{@render toggleLabel()}
{/if}

<div
	class="sp-form-control sp-toggle sp-toggle--{on ? 'on' : 'off'}"
	class:sp-toggle--tall={tall}
	role="switch"
	aria-checked={on}>
	<input
		type="checkbox"
		class="sp-toggle--input"
		bind:checked={on}
		{name}
		{disabled}
		onchange={changeHandler} />

	<div class="sp-toggle--track" />
</div>

{#if label?.length && !prependLabel}
	{@render toggleLabel()}
{/if}
