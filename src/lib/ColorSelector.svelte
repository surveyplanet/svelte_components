<script
	lang="ts"
	context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { ComponentEvent } from '$lib';
	export type ColorSelectorProps = {
		id?: string;
		value?: string;
		onColorSelectorChange?: (
			event: ComponentEvent<string, HTMLInputElement>
		) => void;
		onColorSelectorInput?: (
			event: ComponentEvent<string, HTMLInputElement>
		) => void;
	} & HTMLInputAttributes;
</script>

<script lang="ts">
	import { uniqueId } from '@surveyplanet/utilities';
	import { Icon } from '$lib';

	let {
		id = uniqueId(),
		value = '#000',
		onColorSelectorChange,
		onColorSelectorInput,
		...attr
	} = $props<ColorSelectorProps>();

	const colorInputHandler = (event: Event) => {
		if (typeof onColorSelectorInput === 'function') {
			const componentEvent = new ComponentEvent(
				(event.target as HTMLInputElement).value,
				event.target as HTMLInputElement,
				event
			);
			onColorSelectorInput(componentEvent);
		}
	};

	const colorChangeHandler = (event: Event) => {
		if (typeof onColorSelectorChange === 'function') {
			const componentEvent = new ComponentEvent(
				(event.target as HTMLInputElement).value,
				event.target as HTMLInputElement,
				event
			);
			onColorSelectorChange(componentEvent);
		}
	};
</script>

<label
	class="sp-color-picker"
	for={id}>
	<input
		type="color"
		{id}
		class="color-picker--input"
		bind:value
		oninput={colorInputHandler}
		onchange={colorChangeHandler}
		{...attr} />
	<Icon
		color="#191F29"
		size={12}
		strokeWidth={3}
		name="chevronDown" />
</label>
