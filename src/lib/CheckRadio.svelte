<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let type: 'checkbox' | 'radio' = 'checkbox';
	export let id: string | null = null;
	export let value: string | null = null;
	export let label: string | null = null;
	export let checked: boolean = false;
	export let attr = {};
	export let disabled: boolean = false;
	export let prependLabel: boolean = false;

	const changeEventHandler = (event: Event) => {
		if (disabled) {
			return;
		}
		dispatch('change', event);
	};
</script>

<label
	class="sp-checkradio"
	class:sp-checkradio--prepended={prependLabel}
	for={id}>
	<input
		{type}
		{id}
		{value}
		{checked}
		{disabled}
		class="sp-checkradio--input"
		name={id}
		role={type}
		aria-label={label}
		{...attr}
		on:change={changeEventHandler} />

	{#if label && label.length}
		<span class="sp-checkradio--label">{label}</span>
	{/if}
</label>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-checkradio {
		font: $font--default;
		display: grid;
		grid-template-columns: $size--16 auto;
		gap: $size--16;
		align-items: center;
		& + .sp-checkradio {
			margin-top: $size-gutter;
		}
	}

	// .sp-checkradio--disabled {
	// 	color: $color--slate;
	// 	cursor: not-allowed;
	// }

	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
		font: inherit;
		color: currentColor;
		width: $size--24;
		height: $size--24;
		background-color: $color--white;
		border: 1px solid $color--slate-lighter;
		border-radius: $size-radius--small;
		transform: translateY(-0.075em);
		display: grid;
		place-content: center;
		&::before {
			// check
			content: '';
			width: 0.65em;
			height: 0.65em;
			clip-path: polygon(9% 45%, 39% 68%, 88% 0, 100% 9%, 41% 89%, 0 57%);
			transform: scale(0);
			transform-origin: bottom left;
			transition: 120ms transform ease-in-out;
			box-shadow: inset 1em 1em white;
		}

		&:hover {
			border-color: $color--slate;
		}

		&:checked {
			background-color: $color--purple;
			border-color: $color--purple;
			&::before {
				transform: scale(1);
			}
		}

		@include set-focus {
			outline: 1px solid $color--slate;
			outline-offset: 1px;
		}

		&:disabled {
			color: $color--slate;
			cursor: not-allowed;
		}
	}
</style>
