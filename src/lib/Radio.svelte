<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let value: string | null = null;
	export let label = '';
	export let checked = false;
	export let disabled = false;
	export let prependLabel = false;
	export let attr = {};

	const changeEventHandler = (event: Event): void => {
		if (disabled) {
			return;
		}
		dispatch('change', event);
	};
</script>

<input
	type="radio"
	{name}
	{id}
	{value}
	{checked}
	{disabled}
	{...attr}
	on:change={changeEventHandler} />

<label
	class="sp-radio"
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

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	@keyframes check {
		50% {
			transform: scale(1.2);
		}
	}

	.sp-radio {
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
		&:hover .sp-radio--dot {
			border-color: $color--slate;
		}
		&.sp-radio--prepend {
			flex-direction: row-reverse;
		}
	}

	.sp-radio--dot {
		position: relative;
		width: px-to-rem(24);
		height: px-to-rem(24);
		border-radius: 50%;
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
			border-radius: 50%;
			transition-delay: 0.2s;
		}
		svg {
			position: absolute;
			z-index: 1;
			top: 4px;
			left: 4px;
			fill: transparent;
			transition: all 0.3s ease;
			transition-delay: 0.1s;
			transform: translate3d(0, 0, 0);
		}
	}

	.sp-radio--label {
		&:empty {
			display: none;
		}
	}

	input[type='radio'] {
		appearance: none;

		&:disabled {
			& + .sp-radio {
				.sp-radio--dot {
					border-color: $color--slate-light;
					outline: unset;
					outline-offset: unset;
				}
				.sp-radio--label {
					color: $color--slate-light;
				}
			}
		}

		&:checked {
			& + .sp-radio {
				.sp-radio--dot {
					border-color: $color--purple;
					background: transparent;
					animation: check 0.6s ease;
					svg {
						fill: $color--purple;
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
			& + .sp-radio {
				.sp-radio--dot {
					box-shadow: 0px 0px 0px 1px $color--white,
						0px 0px 0px 2px $color--slate;
				}
			}
		}
	}
</style>
