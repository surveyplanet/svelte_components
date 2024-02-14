<script
	lang="ts"
	context="module">
	export type ToggleProps = {
		id?: string;
		name?: string;
		disabled?: boolean;
		on?: boolean;
		tall?: boolean;
		label?: string | null;
		prependLabel?: boolean;
		onToggleChange?: (on: boolean) => void;
	};
</script>

<script lang="ts">
	// export let meridiemIndicator = false;

	let {
		id = (Date.now() + Math.random()).toString(36),
		name,
		disabled = false,
		on = false,
		tall = false,
		label = null,
		prependLabel = false,
		onToggleChange,
	} = $props<ToggleProps>();

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}

		if (onToggleChange) onToggleChange(on);
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
		onchange={changeHandler} />

	<div class="sp-toggle--track" />
</div>

{#if label?.length && !prependLabel}
	<label
		class="sp-toggle--label"
		class:sp-toggle--label--disabled={disabled}
		for={id}>{label}</label>
{/if}
