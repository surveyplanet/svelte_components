<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch: (name: string, detail: boolean) => boolean =
		createEventDispatcher();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let disabled = false;
	export let on = false;
	export let tall = false;
	export let label: string | null = null;
	export let prependLabel = false;

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}

		dispatch('change', on);
	};
</script>

{#if label?.length && prependLabel}
	<label
		class="sp-toggle--label sp-toggle--label-prepend"
		for={id}>{label}</label>
{/if}

<div
	class="sp-toggle sp-toggle--{on ? 'on' : 'off'}"
	class:sp-toggle--tall={tall}
	role="switch"
	aria-checked={on}>
	<input
		type="checkbox"
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
		for={id}>{label}</label>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-toggle {
		display: inline-block;
		position: relative;
		width: $size--40;
		height: $size--20;
		@include set-focus {
			.sp-toggle--track {
				box-shadow: 0px 0px 0px 1px $color--white,
					0px 0px 0px 2px $color--slate;
			}
		}

		input[type='checkbox'] {
			position: absolute;
			top: 0;
			left: 0;
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			cursor: pointer;
			z-index: 1;

			&:checked + .sp-toggle--track {
				background-color: $color--slate-dark;
				&:after {
					transform: translateX(calc(100% + 4px));
				}
			}

			@include set-focus {
				& + .sp-toggle--track {
					box-shadow: 0px 0px 0px 1px $color--white,
						0px 0px 0px 2px $color--slate;
				}
			}

			&:disabled + .sp-toggle--track {
				background-color: $color--slate-lighter;
			}
		}

		.sp-toggle--track {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: $size--20;
			background-color: $color--light-purple;
			transition: transform 400ms, background-color 400ms;

			&:after {
				position: absolute;
				content: '';
				height: calc($size--20 - 4px);
				width: calc($size--20 - 4px);
				left: 2px;
				top: 2px;
				background-color: $color--white;
				transition: transform 400ms, background-color 400ms;
				border-radius: 50%;
			}
		}

		&.sp-toggle--tall {
			width: $size--36;
			height: $size--24;
			.sp-toggle--track {
				&:after {
					position: absolute;
					content: '';
					height: calc($size--24 - 4px);
					width: calc($size--24 - 4px);
				}
			}
			input[type='checkbox'] {
				&:checked + .sp-toggle--track {
					&:after {
						transform: translateX(calc(100% - 8px));
					}
				}
			}
		}
	}

	.sp-toggle--label {
		cursor: pointer;
		display: inline-block;
		vertical-align: top;
		font: $font--default;
		height: $size--20;
		line-height: $size--20;
		font-size: $font-size--12;
		padding-left: $size-gutter--quarter;
	}
</style>
