<script
	lang="ts"
	context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { ComponentEvent } from './';

	export type ToggleProps = Omit<HTMLInputAttributes, 'size'> & {
		id?: string;
		on?: boolean;
		tall?: boolean;
		label?: string;
		prependLabel?: boolean;
		size?: 'small' | 'medium' | 'large';
		disabled?: boolean; // TS isn't recognizing disabled in HTMLInputElement for some reason
		onToggleChange?: (
			event: ComponentEvent<boolean, HTMLInputElement>
		) => void;
	};
</script>

<script lang="ts">
	import { uniqueId } from '@surveyplanet/utilities';

	let {
		id = uniqueId(),
		on, // no default value since it's bound to the input checked attribute
		tall,
		label,
		size = 'small',
		prependLabel,
		onToggleChange,
		...attr
	} = $props<ToggleProps>();

	const changeHandler = (event: Event): void => {
		if (attr.disabled) {
			return event.preventDefault();
		}

		const target = (event.target as HTMLInputElement)!.closest(
			'input'
		) as HTMLInputElement;

		if (typeof onToggleChange === 'function' && typeof on !== 'undefined') {
			const componentEvent = new ComponentEvent(on, target, event);
			onToggleChange(componentEvent);
		}
	};
</script>

<div
	class="sp-form-control sp-toggle
		sp-toggle--size-{size}
		sp-toggle--{on ? 'on' : 'off'} "
	class:sp-toggle--prepend={prependLabel}
	class:sp-toggle--label--disabled={attr.disabled}>
	<div
		class="sp-toggle--switch"
		class:sp-toggle--tall={tall}
		role="switch"
		aria-checked={on}>
		<input
			{id}
			type="checkbox"
			class="sp-toggle--input"
			bind:checked={on}
			disabled={attr.disabled}
			{...attr}
			onchange={changeHandler} />

		<div class="sp-toggle--track" />
	</div>
	{#if label?.length}
		<label
			class="sp-toggle--label"
			for={id}>
			{label}
		</label>
	{/if}
</div>
