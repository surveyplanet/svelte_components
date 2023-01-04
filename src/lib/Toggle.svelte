<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const SP_TOGGLE_CLICK_EVENT: string = 'SurveyPlanetToggleClickEvent';

	const dispatch = createEventDispatcher();

	const changeHandler = (event: Event): void => {
		if (disabled) {
			return event.preventDefault();
		}
		dispatch(SP_TOGGLE_CLICK_EVENT, event);
	};

	export let checked: boolean = false;

	export let disabled: boolean = false;
</script>

<div class="sp-toggle">
	<input
		type="checkbox"
		class="sp-toggle--input"
		bind:checked
		{disabled}
		on:change={changeHandler} />

	<span class="sp-toggle--slider" />
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-toggle {
		position: relative;

		display: block;

		width: 2rem;
		height: 1rem;
	}

	.sp-toggle--input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		z-index: 1;
	}
	.sp-toggle--slider {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		border-radius: 20px;
		background-color: $color--pink;
		transition: 0.4s;
	}
	.sp-toggle--slider:before {
		position: absolute;
		content: '';
		height: 0.8rem;
		width: 0.8rem;
		left: 0.18rem;
		bottom: 0.1rem;

		background-color: $color--light;
		transition: 0.4s;
		border-radius: 50%;
	}

	.sp-toggle--input:checked + .sp-toggle--slider {
		background-color: $color--blue-dark;
	}
	.sp-toggle--input:checked + .sp-toggle--slider:before {
		transform: translateX(100%);
	}

	.sp-toggle--input:disabled + .sp-toggle--slider {
		background-color: #bdbdbd;
	}
</style>
