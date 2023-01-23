<script lang="ts">
	import type { ChangeEvent } from 'react';
	import { createEventDispatcher } from 'svelte';
	import type { CheckboxOptions } from './_definitions';

	//group by ID

	const dispatch = createEventDispatcher();
	let role = 'checkbox';
	export let type = 'checkbox';
	export let id = null;
	export let value = null;
	export let label = null;
	export let checked = false;
	export let attr = {};
	export let disabled = false;
	export let prependLabel = false;

	if (disabled) {
		role = 'presentation';
	}
	const changeEventHandler = (e: ChangeEvent): void => {
		if (disabled) {
			return;
		}
		dispatch('change', e);
	};
</script>

<div class="sp-checkbox">
	<label for={id}
		><input
			class="sp-checkbox--input"
			class:sp-checkbox--disabled={disabled}
			{...attr}
			{role}
			on:change={changeEventHandler} />
		<span>{label}</span></label>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-checkbox--disabled {
		opacity: 0.5;
	}
</style>
