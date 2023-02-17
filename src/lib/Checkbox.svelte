<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let value: string | null = null;
	export let label = '';
	export let checked = false;
	export let disabled = false;
	export let prependLabel = false;
	export let attr = {};

	onMount(() => {
		if (!name) {
			throw new Error(
				`The 'name' attribute is required for the Checkbox '${id}'`
			);
		}
	});

	const changeEventHandler = (event: Event) => {
		if (disabled) {
			return;
		}
		dispatch('change', event);
	};
</script>

<input
	type="checkbox"
	{id}
	{name}
	{value}
	{checked}
	{disabled}
	{...attr}
	on:change={changeEventHandler} />
<label
	class="sp-checkbox"
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

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	@keyframes check {
		50% {
			transform: scale(1.2);
		}
	}

	.sp-checkbox {
		-webkit-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: $size--14;
		font: $font--default;
		font-size: $font-size--12;
		&:hover .sp-checkbox--check {
			border-color: $color--slate;
		}
		&.sp-checkbox--prepend {
			flex-direction: row-reverse;
		}
	}

	.sp-checkbox--check {
		position: relative;
		width: px-to-rem(22);
		height: px-to-rem(22);
		border-radius: $size-radius--small;
		transform: scale(1);
		border: 1px solid $color--slate-light;
		transition: all 0.2s ease;
		&:before {
			content: '';
			width: 100%;
			height: 100%;
			background: $color--purple;
			display: block;
			transform: scale(0);
			opacity: 1;
			border-radius: $size-radius--default;
			transition-delay: 0.2s;
		}
		svg {
			position: absolute;
			z-index: 1;
			top: 7px;
			left: 5px;
			fill: none;
			stroke: white;
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-dasharray: 16px;
			stroke-dashoffset: 16px;
			transition: all 0.3s ease;
			transition-delay: 0.1s;
			transform: translate3d(0, 0, 0);
		}
	}

	.sp-checkbox--label {
		&:empty {
			display: none;
		}
	}

	input[type='checkbox'] {
		appearance: none;

		&:disabled {
			& + .sp-checkbox {
				.sp-checkbox--check {
					border-color: $color--slate-light;
					outline: unset;
					outline-offset: unset;
				}
				.sp-checkbox--label {
					color: $color--slate-light;
				}
			}
		}

		&:checked {
			& + .sp-checkbox {
				.sp-checkbox--check {
					border-color: $color--purple;
					background: $color--purple;
					animation: check 0.6s ease;
					svg {
						stroke-dashoffset: 0;
					}
					&:before {
						transform: scale(2.2);
						opacity: 0;
						transition: all 0.6s ease;
					}
				}
			}
		}

		@include set-focus {
			& + .sp-checkbox {
				.sp-checkbox--check {
					box-shadow: 0px 0px 0px 1px $color--white,
						0px 0px 0px 2px $color--slate;
				}
			}
		}
	}
</style>
