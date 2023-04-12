<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Cleave from 'cleave.js';
	import type { CleaveOptions } from 'cleave.js/options';

	/**
	 * The label of the input
	 */
	export let label = '';
	/**
	 * The unique id of the input
	 */
	export let id = (Date.now() + Math.random()).toString(36);
	/**
	 * The step of the input
	 */
	export let step = 1;
	/**
	 * The minimum value of the input
	 */
	export let min = 0;
	/**
	 * The maximum value of the input
	 */
	export let max = 100;
	/**
	 * The value of the input
	 */
	export let value: number | undefined = undefined;
	/**
	 * Whether the input is disabled
	 */
	export let disabled = false;
	/**
	 * Whether the input is required
	 */
	export let required = false;
	/**
	 * Whether the value will change to the min or max value when the user tries to increment or decrement the value over the min or max value
	 */
	export let overflow = false;
	/**
	 * The placeholder of the input
	 */
	export let placeholder = '';

	const dispatchChange: (name: string, detail: number) => boolean =
		createEventDispatcher();
	const dispatchBlurAndFocus: (name: string) => boolean =
		createEventDispatcher();

	let input: HTMLInputElement;

	let spinnerInterval: ReturnType<typeof setInterval>;

	$: {
		let cleaveOptions = {
			numeral: true,
			numeralThousandsGroupStyle: 'thousand',
		} as CleaveOptions;

		if (input) {
			new Cleave(input, cleaveOptions);
		}
	}

	const getValue = (increment: boolean): number | undefined => {
		const currentValue = value;
		if (currentValue === undefined) {
			if (increment) {
				return min + step;
			} else {
				return max - step;
			}
		}
		let newValue = increment ? currentValue + step : currentValue - step;
		if (!overflow) {
			if (newValue >= max) {
				console.log('max');
				newValue = max;
			} else if (newValue <= min) {
				newValue = min;
			}
		}
		if (overflow && newValue > max) {
			return min;
		} else if (overflow && newValue < min) {
			return max;
		}
		return newValue;
	};

	const changeValue = (newValue: number | undefined) => {
		if (newValue !== value && newValue !== undefined) {
			value = newValue;

			dispatchChange('change', value);
		}
	};

	const increment = () => {
		changeValue(getValue(true));
	};

	const decrement = () => {
		changeValue(getValue(false));
	};

	const inputChange = () => {
		if (value === undefined) {
			return;
		}
		if (value >= min && value <= max) {
			value;
		}
	};

	const inputHandler = () => {
		inputChange();
	};

	// on keydown check if the key is NaN or : or arrows/enter/tab and return false
	const keyUpHandler = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			increment();
		} else if (e.key === 'ArrowDown') {
			decrement();
		}
	};

	const blurHandler = () => {
		dispatchBlurAndFocus('blur');
	};

	const focusHandler = () => {
		dispatchBlurAndFocus('focus');
	};

	const upMouseDownHandler = (e: MouseEvent) => {
		const input = e.target as HTMLInputElement;
		input.focus();
		spinnerInterval = setInterval(() => {
			increment();
		}, 100);
	};

	const downMouseDownHandler = (e: MouseEvent) => {
		const input = e.target as HTMLInputElement;
		input.focus();
		spinnerInterval = setInterval(() => {
			decrement();
		}, 100);
	};

	const mouseUpHandler = () => {
		clearInterval(spinnerInterval);
	};
</script>

<label
	for="sp-number-spinner"
	class="sp-number-spinner--label"
	>{label}
	{#if required}
		<span class="sp-dropdown--label--required">*</span>
	{/if}
</label>
<div class="sp-number-spinner sp-number-spinner">
	<input
		class="sp-number-spinner--input"
		type="number"
		bind:value
		bind:this={input}
		on:keyup={keyUpHandler}
		on:blur={blurHandler}
		on:focus={focusHandler}
		{placeholder}
		{step}
		{id}
		{disabled}
		on:input={inputHandler} />

	<div class="sp-number-spinner--buttons">
		<button
			class="sp-number-spinner--button sp-number-spinner--button--up"
			on:mousedown={upMouseDownHandler}
			on:mouseup={mouseUpHandler}
			on:click={() => {
				increment();
			}}>
			<svg
				class="sp-number-spinner--button-icon--flipped"
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
			class="sp-number-spinner--button sp-number-spinner--button--down"
			on:mousedown={downMouseDownHandler}
			on:mouseup={mouseUpHandler}
			on:click={() => {
				decrement();
			}}>
			<svg
				class="sp-number-spinner--button-icon"
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
		justify-content: center;
		height: $size-gutter;
		border: 1px solid $color--slate;
		border-radius: 4px;
		padding: 0 8px;
		font: $font--default;

		&:focus-within {
			border-color: $color--light-purple-dark;
		}

		&--label {
			color: $color--slate-dark;
			display: block;
			font: $font--default;
			font-size: $font-size--12;
			padding: 0 0 $size--12 $size--4;
			.sp-dropdown--label--required {
				color: $color--pink;
				font-size: $font-size--14;
			}
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
			background-color: transparent;
			transition: background-color 0.2s ease-in-out;

			&:hover {
				background-color: $color--light-purple-dark;
			}

			&:active {
				background-color: $color--light-purple-dark;
			}
		}
	}

	input {
		border: hidden;
		outline: none;
		text-align: left;
		width: 100%;
	}

	.sp-number-spinner--button-icon--flipped {
		transform: rotate(180deg);
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		/* display: none; <- Crashes Chrome on hover */
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
	}
</style>
