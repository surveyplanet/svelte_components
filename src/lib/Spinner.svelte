<script lang="ts">
	import { createEventDispatcher } from 'svelte';

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
	/**
	 * The speed for the drag in pixels
	 */
	export let dragSpeed = 10;

	const dispatch: (name: string, detail: number | undefined) => boolean =
		createEventDispatcher();

	const dispatchFocus: (name: string) => boolean = createEventDispatcher();

	const dispatchBlur: (name: string) => boolean = createEventDispatcher();

	let input: HTMLInputElement;

	let spinnerTimeout: ReturnType<typeof setTimeout>;

	let spinnerInterval: ReturnType<typeof setInterval>;

	let spinnerIntervalSpeed = 25;

	let controlValue: number | undefined = value;

	let startX: number;

	let isDragging = false;

	const checkOverflow = (newValue: number | undefined): number => {
		if (newValue === undefined) {
			newValue = min;
		}
		if (!overflow) {
			if (newValue >= max) {
				newValue = max;
			} else if (newValue <= min) {
				newValue = min;
			}
		}

		if (overflow && newValue > max) {
			newValue = min;
		} else if (overflow && newValue < min) {
			newValue = max;
		}
		return newValue;
	};

	const changeValue = (increment: boolean) => {
		let currentValue = value;

		if (currentValue === undefined) {
			currentValue = min;
		}

		let newValue = increment ? currentValue + step : currentValue - step;

		if (newValue !== value && newValue !== undefined) {
			value = checkOverflow(newValue);
			dispatch('update', value);
		}
		if (currentValue === undefined) {
			if (increment) {
				return checkOverflow(min + step);
			} else {
				return checkOverflow(max - step);
			}
		}
	};

	const increment = () => {
		changeValue(true);
	};

	const decrement = () => {
		changeValue(false);
	};

	const inputChange = (arrow?: string) => {
		if (value === undefined) {
			return;
		}
		if (arrow === 'ArrowUp' && value + step >= max) {
			value = checkOverflow(value + step);
		} else if (arrow === 'ArrowDown' && value - step <= min) {
			value = checkOverflow(value - step);
		} else {
			value = checkOverflow(value);
		}
		dispatch('update', value);
	};
	// Mouse dragging

	const onMouseMove = (event: MouseEvent) => {
		// call changeValue every 10px the mouse moves
		if (event.clientX - startX > dragSpeed) {
			startX = event.clientX;
			changeValue(true);
		} else if (event.clientX - startX < -dragSpeed) {
			startX = event.clientX;
			changeValue(false);
		}
	};

	const stopDragging = () => {
		isDragging = false;
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', stopDragging);
	};

	const checkForValueChange = () => {
		if (value !== controlValue) {
			dispatch('input', value);
		}
		controlValue = value;
	};

	// Handlers

	const mouseDragDownHandler = (event: MouseEvent) => {
		isDragging = true;
		startX = event.clientX;
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', stopDragging);
	};

	const upMouseDownHandler = () => {
		// increment then use to delay for 1 sec before setting interval
		increment();

		spinnerTimeout = setTimeout(() => {
			spinnerInterval = setInterval(() => {
				increment();
			}, spinnerIntervalSpeed);
		}, 500);
	};

	const downMouseDownHandler = () => {
		decrement();

		spinnerTimeout = setTimeout(() => {
			spinnerInterval = setInterval(() => {
				decrement();
			}, spinnerIntervalSpeed);
		}, 500);
	};
	const changeHandler = () => {
		dispatch('change', value);
	};

	const inputHandler = () => {
		inputChange();
	};
	const mouseUpHandler = () => {
		clearTimeout(spinnerTimeout);
		clearInterval(spinnerInterval);
	};

	const blurHandler = () => {
		checkForValueChange();
		dispatchBlur('blur');
	};

	const focusHandler = () => {
		dispatchFocus('focus');
	};
	const inputClickHandler = () => {
		input.focus();
	};
	const keydownHandler = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp') {
			inputChange('ArrowUp');
		} else if (event.key === 'ArrowDown') {
			inputChange('ArrowDown');
		}
	};
</script>

<div class="sp-spinner sp-spinner">
	<label
		for="sp-spinner"
		class="sp-spinner--label"
		>{label}
		{#if required}
			<span class="sp-spinner--label--required">*</span>
		{/if}
	</label>

	<input
		class="sp-number-spinner--input"
		type="number"
		bind:value
		bind:this={input}
		on:blur={blurHandler}
		on:change={changeHandler}
		on:focus={focusHandler}
		on:input={inputHandler}
		on:click={inputClickHandler}
		on:mousedown={mouseDragDownHandler}
		on:keydown={keydownHandler}
		{min}
		{max}
		{placeholder}
		{step}
		{id}
		{disabled} />

	<div class="sp-spinner--buttons">
		<button
			class="sp-spinner--button sp-spinner--button--up"
			on:mousedown={upMouseDownHandler}
			on:mouseup={mouseUpHandler}
			on:blur={blurHandler}
			on:change={changeHandler}
			on:focus={focusHandler}>
			<svg
				width="7"
				height="4"
				viewBox="0 0 7 4"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.08984 0.830868L3.50606 3.24707L6.0002 0.75293"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round" />
			</svg>
		</button>
		<button
			class="sp-spinner--button sp-spinner--button--down"
			on:mousedown={downMouseDownHandler}
			on:mouseup={mouseUpHandler}>
			<svg
				width="7"
				height="4"
				viewBox="0 0 7 4"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.08984 0.830868L3.50606 3.24707L6.0002 0.75293"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round" />
			</svg>
		</button>
	</div>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-spinner {
		position: relative;
		font: $font--default;
	}

	label {
		color: $color--slate-dark;
		display: block;
		font: $font--default;
		font-size: $font-size--12;
		padding: 0 0 $size--12 $size--4;
		.sp-spinner--label--required {
			color: $color--pink;
			font-size: $font-size--14;
		}
	}

	input {
		appearance: textfield;
		-moz-appearance: textfield;
		box-sizing: border-box;
		font: $font--default;
		font-size: $font-size--12;
		width: 100%;
		height: $size--40;
		min-width: $size--256;
		background-color: $color--white;
		border: 1px solid $color--slate-lighter;
		border-radius: $size-radius--default;
		padding: $size--12 $size--16;
		@include set-focus {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--slate;
		}
		&:active {
			border: 1px solid #e7e3ff;
			box-shadow: 0px 0px 0px 2px $color--light-purple-light;
		}

		&:hover {
			cursor: ew-resize;
		}

		// read-only controls can still function and are still focusable
		&:read-only {
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}

		// disabled controls can not receive focus and are not submitted with the
		// form and generally do not function as controls until they are enabled
		&:disabled {
			cursor: not-allowed;
			color: $color--slate-light;
			border-color: $color--slate-light;
			background-color: rgba(0, 0, 0, 0.075);
			box-shadow: none;
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}

		&::placeholder {
			color: $color--slate-light;
		}

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			/* display: none; <- Crashes Chrome on hover */
			-webkit-appearance: none;
			margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
		}
	}

	.sp-spinner--buttons {
		position: absolute;
		bottom: 0;
		right: 0;
		height: $size--40;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 24px;
		height: 50%;
		border: none;
		background-color: transparent;
		transition: background-color 0.2s ease-in-out;
		svg path {
			stroke: $color--slate-dark;
		}
		// background-color: pink;
		&:first-child {
			padding-top: $size--10;
			border-radius: 0 $size-radius--default 0 0;
		}
		&:last-child {
			padding-bottom: $size--10;
			border-radius: 0 0 $size-radius--default 0;
		}
		&:hover {
			// background-color: $color--slate-light;
			svg path {
				stroke: $color--purple;
			}
		}

		&:active {
			background-color: $color--slate-lighter;
			svg path {
				stroke: $color--slate-dark;
			}
		}

		&.sp-spinner--button--up {
			svg {
				transform: rotate(180deg);
			}
		}
	}
</style>
