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

	const changeEventHandler = (event: Event): void => {
		dispatchChange('change', event);
	};
</script>

<input
	type="radio"
	class="sp-radio--input"
	{name}
	{id}
	{value}
	{checked}
	{disabled}
	{...$$restProps}
	on:change={changeEventHandler} />

<label
	class="sp-radio sp-radio--{size}"
	class:sp-radio--prepend={prependLabel}
	for={id}>
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
