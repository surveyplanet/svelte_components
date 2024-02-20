<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
		name?: string;
		value?: string | null;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		prependLabel?: boolean;
		size?: 'small' | 'medium' | 'large';
		onCheckboxChange?: (event: ComponentEvent<boolean>) => void;
	};
</script>

<script lang="ts">
	import { ComponentEvent } from './';
	let {
		id,
		name,
		value,
		label,
		checked,
		disabled,
		prependLabel,
		size = 'small', // seems like a usual size we use
		onCheckboxChange,
		...attr
	} = $props<CheckboxProps>();

	const checkboxChangeHandler = (event: Event): void => {
		if (typeof onCheckboxChange === 'function') {
			const componentEvent = new ComponentEvent(
				(event.target as HTMLInputElement).checked,
				event.target!,
				event
			);
			onCheckboxChange(componentEvent);
		}
	};
</script>

<input
	type="checkbox"
	class="sp-checkbox--input"
	{id}
	{name}
	{value}
	bind:checked
	{disabled}
	{...attr}
	onchange={checkboxChangeHandler} />
<label
	class="sp-checkbox sp-checkbox--{size}"
	class:sp-checkbox--prepend={prependLabel}
	for={id}>
	<span class="sp-checkbox--check">
		<svg
			width="12px"
			height="9px"
			viewBox="0 0 12 9">
			<polyline points="1 5 4 8 11 1" />
		</svg>
	</span>
	<span class="sp-checkbox--label">{label}</span>
</label>
