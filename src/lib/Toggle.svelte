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

	function switchChecked(): void {
		if (checked) {
			document
				.querySelector('.sp-toggle--input')
				.classList.add('sp-toggle--input-checked');
		} else {
			document
				.querySelector('.sp-toggle--input')
				.classList.remove('sp-toggle--input-checked');
		}
	}
</script>

<div class="sp-toggle">
	{disabled}
	{checked}
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

		display: block;

		width: 40px;

		height: 24px;
		border-radius: 8px;
	}
</style>
