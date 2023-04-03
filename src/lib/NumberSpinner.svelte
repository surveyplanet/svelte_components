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
	export let value = '';
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
	 * The type of the input
	 */
	export let type: 'number' | 'time' | 'float' = 'float';
	/**
	 * The time format of the input
	 */
	export let timeFormat: '12' | '24' = '24';
	/**
	 * The placeholder of the input
	 */
	export let placeholder = '';

	const dispatchChange: (name: string, detail: string) => boolean =
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

		if (type === 'time') {
			cleaveOptions = {
				time: true,
				timePattern: ['h', 'm'],
				timeFormat: timeFormat,
			};
		} else if (type === 'float') {
			cleaveOptions.numeralDecimalMark = '.';
			cleaveOptions.numeralDecimalScale = 2;
		}

		if (input) {
			new Cleave(input, cleaveOptions);
		}
	}

	const valueToNumber = (value: string) => {
		if (!value?.length) {
			return 0;
		}

		if (type === 'time') {
			const [hours, minutes] = value.split(':');
			return parseInt(hours) * 60 + parseInt(minutes);
		} else {
			return parseFloat(value);
		}
	};

	const getValue = (increment: boolean): string => {
		if (type === 'time') {
			let [hours, minutes] = value.split(':');
			if (!hours?.length) {
				hours = '0';
			}
			if (!minutes?.length) {
				minutes = '0';
			}
			const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
			const newTotalMinutes = increment
				? totalMinutes + step
				: totalMinutes - step;
			let newHours = Math.floor(newTotalMinutes / 60);
			let newMinutes = newTotalMinutes % 60;
			if (timeFormat === '12') {
				if (newHours > 12) {
					newHours = newHours - 12;
				} else if (newHours === 0) {
					newHours = 12;
				}
			}
			if (timeFormat === '24') {
				if (newHours < 0) {
					newHours = 23;
				} else if (newHours > 23) {
					newHours = 0;
				}
			}
			return `${newHours.toString().padStart(2, '0')}:${newMinutes
				.toString()
				.padStart(2, '0')}`;
		} else {
			const currentValue = valueToNumber(value);
			let newValue = increment
				? currentValue + step
				: currentValue - step;
			if (newValue === max) {
				newValue = max;
			} else if (newValue === min) {
				newValue = min;
			}

			if (overflow && newValue > max) {
				return min.toString();
			} else if (overflow && newValue < min) {
				return max.toString();
			}
			return newValue.toString();
		}
	};

	const changeValue = (newValue: string) => {
		if (newValue !== value) {
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
		let val = '';

		if (parseFloat(val) >= min && parseFloat(val) <= max) {
			value = val;
		}
	};

	const inputHandler = () => {
		inputChange();
		dispatchChange('change', value);
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
<div class="sp-number-spinner sp-number-spinner--{type}">
	<input
		class="sp-number-spinner--input"
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
</style>
