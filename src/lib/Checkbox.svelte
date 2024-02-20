<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
		name?: string; // 'name' is not a property of HTMLInputElement (for some reason) so add it here.
		group?: string[]; // use group instead of checked: https://github.com/sveltejs/svelte/issues/2300
		value?: string;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		prependLabel?: boolean;
		size?: 'small' | 'medium' | 'large';
		onCheckboxChange?: (event: ComponentEvent<string[]>) => void;
	};
</script>

<script lang="ts">
	import { ComponentEvent } from './';
	let {
		group = [],
		value,
		label,
		checked,
		disabled,
		prependLabel,
		size = 'small',
		onCheckboxChange,
		...attr
	} = $props<CheckboxProps>();

	const checkboxChangeHandler = (event: Event): void => {
		console.log('checkboxChangeHandler', group);

		if (typeof onCheckboxChange === 'function') {
			const target = event.target as HTMLInputElement;
			const componentEvent = new ComponentEvent(group, target, event);
			onCheckboxChange(componentEvent);
		}
	};
</script>

<input
	type="checkbox"
	class="sp-checkbox--input"
	{value}
	bind:group
	{checked}
	{disabled}
	{...attr}
	onchange={checkboxChangeHandler} />

<label
	class="sp-checkbox sp-checkbox--{size}"
	class:sp-checkbox--prepend={prependLabel}
	for={typeof attr.id !== 'undefined' && attr.id !== null ? attr.id : void 0}>
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
