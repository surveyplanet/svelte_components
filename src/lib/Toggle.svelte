<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchChange = createEventDispatcher<{
		change: boolean;
	}>();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let disabled = false;
	export let on = false;
	export let tall = false;
	export let label: string | null = null;
	export let prependLabel = false;
	// export let meridiemIndicator = false;

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}

		dispatchChange('change', on);
	};
</script>

{#if label?.length && prependLabel}
	<label
		class="sp-toggle--label sp-toggle--label-prepend"
		class:sp-toggle--label--disabled={disabled}
		for={id}>{label}</label>
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
		{id}
		{name}
		{disabled}
		on:change={changeHandler} />

	<div class="sp-toggle--track" />
</div>

{#if label?.length && !prependLabel}
	<label
		class="sp-toggle--label"
		class:sp-toggle--label--disabled={disabled}
		for={id}>{label}</label>
{/if}
