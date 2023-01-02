<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const SP_TOGGLE_CLICK_EVENT: string = 'SurveyPlanetToggleClickEvent';

	const dispatch = createEventDispatcher();

	const clickHandler = (event: MouseEvent): void => {
		dispatch(SP_TOGGLE_CLICK_EVENT, event);
		switchChecked();
	};

	export let checked: boolean = false;

	export let disabled: boolean = false;

	const toggleSwitch = <HTMLButtonElement>(
		document.querySelector('.sp-toggle--input')
	);

	function switchChecked(): void {
		if (checked) {
			toggleSwitch.classList.add('sp-toggle--input-checked');
		} else {
			toggleSwitch.classList.remove('sp-toggle--input-checked');
		}
	}
</script>

<div class="sp-toggle">
	{#if disabled}
		<input
			type="checkbox"
			class="sp-toggle--input"
			bind:checked
			disabled
			on:click={clickHandler} />
	{:else}
		<input
			type="checkbox"
			class="sp-toggle--input"
			bind:checked
			on:click={clickHandler} />
	{/if}

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
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 3px;

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
