<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const SP_TOGGLE_CLICK_EVENT: string = 'SurveyPlanetToggleClickEvent';

	const dispatch = createEventDispatcher();

	const clickHandler = (event: MouseEvent): void => {
		dispatch(SP_TOGGLE_CLICK_EVENT, event);
	};

	export let checked: boolean = false;

	if (checked) {
		document
			.getElementsByClassName('sp-toggle--input')[0]
			.classList.add('sp-toggle--input-checked');
	}
</script>

<div class="sp-toggle">
	<input
		type="checkbox"
		class="sp-toggle--input"
		bind:checked
		on:click={clickHandler} />

	<div class="sp-toggle__track">
		<div class="sp-toggle__thumb" />
	</div>
</div>

<style>
	.sp-toggle {
		position: relative;

		display: inline-block;

		width: 40px;

		height: 24px;
	}
</style>
