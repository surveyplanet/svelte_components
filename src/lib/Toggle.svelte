<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let on: boolean = false;
	export let disabled: boolean = false;
	export let tall: boolean = false;

	// This won't work in dark mode, just overwrite will global styles
	// export let onTrackColor = '#262b35';
	// export let onKnobColor = '#f7f8f7';
	// export let offTrackColor = '#ede2ff';
	// export let offKnobColor = '#f7f8f7';
	// export let disabledTrackColor = '#67748e';
	// export let disabledKnobColor = '#f7f8f7';

	// let trackColor: string | undefined;
	// let knobColor: string | undefined;

	// $: {
	// 	if (disabled) {
	// 		trackColor = disabledTrackColor;
	// 		knobColor = disabledKnobColor;
	// 	} else if (on) {
	// 		trackColor = onTrackColor;
	// 		knobColor = onKnobColor;q
	// 	} else {
	// 		trackColor = offTrackColor;
	// 		knobColor = offKnobColor;
	// 	}
	// }

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}
		dispatch('toggleEvent', on);
	};
</script>

<div
	data-testid="toggle"
	class="sp-toggle sp-toggle--{on ? 'on' : 'off'}
		{tall ? 'sp-toggle--tall' : ''}">
	<input
		type="checkbox"
		class="sp-toggle--input"
		bind:checked={on}
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
	}

	.sp-toggle--tall {
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
		.sp-toggle--input {
			&:checked + .sp-toggle--track {
				&:after {
					transform: translateX(calc(100% - 8px));
				}
			}
		}
	}

	.sp-toggle--input {
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
			background-color: $color--darkest;
			&:after {
				transform: translateX(calc(100% + 4px));
			}
		}

		&:disabled + .sp-toggle--track {
			background-color: $color--dark;
		}
	}
	.sp-toggle--track {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: $size--20;
		background-color: $color--purple-lighter;
		transition: 0.4s;

		&:after {
			position: absolute;
			content: '';
			height: calc($size--20 - 4px);
			width: calc($size--20 - 4px);
			left: 2px;
			top: 2px;
			background-color: $color--light;
			transition: 0.4s;
			border-radius: 50%;
		}
	}
</style>
