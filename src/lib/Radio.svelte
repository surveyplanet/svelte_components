<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';

	export type RadioProps = HTMLAttributes<HTMLInputElement> & {
		name?: string; // 'name' is not a property of HTMLInputElement (for some reason) so add it here.
		group?: string; // use group instead of checked: https://github.com/sveltejs/svelte/issues/2300
		value?: string;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		prependLabel?: boolean;
		size?: 'small' | 'medium' | 'large';
		onRadioChange?: (event: ComponentEvent<string>) => void;
	};
</script>

<script lang="ts">
	import { ComponentEvent } from '$lib';
	import { onMount } from 'svelte';
	let {
		group = [],
		value,
		label,
		checked,
		disabled,
		prependLabel,
		size = 'small',
		onRadioChange,
		...attr
	} = $props<RadioProps>();

	onMount(() => {
		console.log(
			'Radio component mounted',
			Object.prototype.toString.call(
				document.querySelector('input[type="radio"]')
			)
		);
	});

	const ratioChangeHandler = (event: Event) => {
		if (typeof onRadioChange === 'function') {
			const componentEvent = new ComponentEvent(
				(event.target as HTMLInputElement).value,
				event.target!,
				event
			);
			onRadioChange(componentEvent);
		}
	};
</script>

<input
	type="radio"
	class="sp-radio--input"
	{value}
	bind:group
	{checked}
	{disabled}
	{...attr}
	onchange={ratioChangeHandler} />

<label
	class="sp-radio sp-radio--{size}"
	class:sp-radio--prepend={prependLabel}
	for={typeof attr.id !== 'undefined' && attr.id !== null ? attr.id : void 0}>
	<span class="sp-radio--dot">
		<svg
			width="16px"
			height="16px"
			viewBox="0 0 16 16">
			<circle
				cx="8"
				cy="8"
				r="50%" />
		</svg>
	</span>
	<span class="sp-radio--label">{label}</span>
</label>
