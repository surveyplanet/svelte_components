<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchChange = createEventDispatcher<{
		change: Event;
	}>();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let value: string | null = null;
	export let label = '';
	export let checked = false;
	export let disabled = false;
	export let prependLabel = false;
	export let size: 'small' | 'medium' | 'large' = 'small';

	const changeEventHandler = (event: Event) => {
		dispatchChange('change', event);
	};
</script>

<input
	type="checkbox"
	class="sp-checkbox--input"
	{id}
	{name}
	{value}
	{checked}
	{disabled}
	{...$$restProps}
	on:change={changeEventHandler} />
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
