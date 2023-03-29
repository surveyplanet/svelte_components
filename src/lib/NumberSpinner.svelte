<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	export let label = '';
	export let step = 1;
	export let min = 0;
	export let max = 100;
	export let value = 0;

	export let disabled = false;
	export let required = false;
	//overflow is used to handle overflow of the input value and goes from max to min and vice versa
	export let overflow = false;
	export let time = false;
	export let currency = false;
	export let id = '';

	const dispatch: (name: string, detail: number) => boolean =
		createEventDispatcher();

	const increment = () => {
		// let currentVal;
		if (value + step <= max) {
			value += step;
			if (overflow && value + step > max) value = min;
		} else {
			value = max;
		}
		dispatch('change', value);
	};

	const decrement = () => {
		if (value - step >= min) {
			value -= step;
			if (overflow && value - step < min) value = max;
		} else {
			value = min;
		}
		dispatch('change', value);
	};

	// use parseFloat to handle decimal numbers

	const inputChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const val = parseInt(input.value);

		if (val >= min && val <= max) {
			value = val;
			dispatch('change', value);
		}
	};

	const setTwoNumberDecimal = (value) => {
		if (time) {
			const input = value.target as HTMLInputElement;
			const val = input.value;
			const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
			if (timeRegex.test(val)) {
				input.value = val;
			} else {
				input.value = '';
			}
		} else if (currency) {
			const input = value.target as HTMLInputElement;
			const val = input.value;
			const currencyRegex = /^\d+(?:\.\d{0,2})$/;
			if (currencyRegex.test(val)) {
				input.value = val;
			} else {
				input.value = '';
			}
		} else {
			const input = value.target as HTMLInputElement;
			const val = input.value;
			const numberRegex = /^\d+$/;
			if (numberRegex.test(val)) {
				input.value = val;
			} else {
				input.value = '';
			}
		}
	};

	const inputHandler = (event: Event) => {
		setTwoNumberDecimal(event);
		inputChange(event);
	};

	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			increment();
		} else if (e.key === 'ArrowDown') {
			decrement();
		}
	};
</script>

<label
	for="sp-number-spinner"
	class="sp-number-spinner--label">{label}</label>
<div
	class="sp-number-spinner"
	on:keydown={keydownHandler}>
	<input
		type="number"
		bind:value
		{step}
		{id}
		{disabled}
		on:input={inputHandler} />
	<div class="sp-number-spinner--buttons">
		<button
			class="sp-number-spinner--button"
			on:click={increment}>
			<svg
				class="sp-dropdown--toggle-icon"
				width="7"
				height="4"
				viewBox="0 0 7 4"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.08984 0.830868L3.50606 3.24707L6.0002 0.75293"
					stroke="#162137"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round" />
			</svg>
		</button>
		<button
			class="sp-number-spinner--button"
			on:click={decrement}>
			<svg
				class="sp-dropdown--toggle-icon"
				width="7"
				height="4"
				viewBox="0 0 7 4"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.08984 0.830868L3.50606 3.24707L6.0002 0.75293"
					stroke="#162137"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round" />
			</svg>
		</button>
	</div>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-number-spinner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: $size-gutter;
		border: 1px solid $color--slate;
		border-radius: 4px;
		padding: 0 8px;
		color: red;

		&:focus-within {
			border-color: $color--light-purple-dark;
		}

		&--label {
			display: block;
			margin-bottom: 4px;
			font-size: 14px;
			line-height: 20px;
			color: $color--slate;
		}

		&--buttons {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
		}

		&--button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 24px;
			height: 24px;
			border: none;
			border-radius: 4px;
			background-color: $color--slate-lighter;
			transition: background-color 0.2s ease-in-out;

			&:hover {
				background-color: $color--light-purple-dark;
			}

			&:active {
				background-color: $color--light-purple-dark;
			}
		}
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	// input[type='number'] {
	// 	-moz-appearance: textfield;
	// }
</style>
