<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let on = false;
	export let disabled = false;
	export let id: string = (Date.now() + Math.random()).toString(36);
	export let tall = false;
	export let name: string;

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}

		dispatch('change', on);
	};
</script>

<div
	class="sp-toggle sp-toggle--{on ? 'on' : 'off'}"
	class:sp-toggle--tall={tall}
	role="switch"
	{id}
	aria-checked={on}>
	<input
		type="checkbox"
		bind:checked={on}
		{name}
		{disabled}
		on:change={changeHandler} />

	<div class="sp-toggle--track" />
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-toggle {
		display: block;
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
			transition: 400ms;

			&:after {
				position: absolute;
				content: '';
				height: calc($size--20 - 4px);
				width: calc($size--20 - 4px);
				left: 2px;
				top: 2px;
				background-color: $color--white;
				transition: 0.4s;
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
</style>
