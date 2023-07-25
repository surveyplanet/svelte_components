<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label = '';
	export let id = (Date.now() + Math.random()).toString(36);
	export let step = 1;
	export let min = 0;
	export let max = 100;
	export let value: number | undefined = undefined;
	export let disabled = false;
	export let required = false;
	export let overflow = false;
	export let dragSpeed = 10;
	export let placeholder: string | null = null;
	export let size: 'small' | 'medium' | 'large' = 'small';

	const dispatchFocus = createEventDispatcher<{ focus: boolean }>();
	const dispatchBlur = createEventDispatcher<{ blur: boolean }>();
	const dispatchChange = createEventDispatcher<{
		change: number | undefined;
	}>();
	const dispatchInput = createEventDispatcher<{
		input: number | undefined;
	}>();
	const dispatchUpdate = createEventDispatcher<{
		update: number | undefined;
	}>();

	let input: HTMLInputElement;

	let spinnerTimeout: ReturnType<typeof setTimeout>;

	let spinnerInterval: ReturnType<typeof setInterval>;

	let spinnerIntervalSpeed = 25;

	let controlValue: number | undefined = value;

	let startX: number;
	// let isDragging = false;
	let visibleButtons = false;

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
			dispatchUpdate('update', value);
		}
		if (currentValue === undefined) {
			if (increment) {
				return checkOverflow(min + step);
			} else {
				return checkOverflow(max - step);
			}
		}
	};

	const reset = () => {
		value = undefined;
		dispatchUpdate('update', value);
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
		dispatchUpdate('update', value);
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
		// isDragging = false;
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', stopDragging);
	};

	const checkForValueChange = () => {
		if (value !== controlValue) {
			dispatchInput('input', value);
		}
		controlValue = value;
	};

	// Handlers
	const mouseDragDownHandler = (event: MouseEvent) => {
		// isDragging = true;
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
		dispatchChange('change', value);
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
		visibleButtons = false;
	};

	const focusHandler = () => {
		dispatchFocus('focus');
		visibleButtons = true;
	};
	const inputClickHandler = () => {
		input.focus();
	};
	const keydownHandler = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp') {
			inputChange('ArrowUp');
		} else if (event.key === 'ArrowDown') {
			inputChange('ArrowDown');
		} else if (event.key === 'Backspace' || event.key === 'Delete') {
			reset();
		}
	};
	const spinnerFocusHandler = () => {
		input.focus();
	};
	const spinnerBlurHandler = () => {
		input.blur();
	};
</script>

<div
	class="sp-spinner sp-spinner--{size}"
	on:focus={spinnerFocusHandler}
	on:blur={spinnerBlurHandler}>
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

	<div
		class="sp-spinner--buttons"
		class:sp-spinner--buttons--visible={visibleButtons}>
		<button
			class="sp-spinner--button sp-spinner--button--up"
			{disabled}
			on:mousedown={upMouseDownHandler}
			on:mouseup={mouseUpHandler}
			on:change={changeHandler}
			on:blur={blurHandler}
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
			{disabled}
			on:mousedown={downMouseDownHandler}
			on:mouseup={mouseUpHandler}
			on:blur={blurHandler}
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
	</div>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-spinner {
		position: relative;
		font: $font--default;

		&.sp-spinner--medium {
			font-size: $font-size--14;
			input {
				height: $size--48;
			}
			.sp-spinner--buttons {
				height: $size--48;
			}
		}
		&.sp-spinner--large {
			font-size: $font-size--16;
			input {
				height: $size--52;
			}
			.sp-spinner--buttons {
				height: $size--52;
			}
		}
	}
	.sp-spinner:hover {
		.sp-spinner--buttons {
			visibility: visible;
		}
	}

	label {
		color: $color--dark;
		display: block;
		font: inherit;
		padding: 0 0 $size--12 $size--4;
		.sp-spinner--label--required {
			color: $color--pink;
			font-size: smaller;
		}
	}

	input {
		box-sizing: border-box;
		appearance: textfield;
		-moz-appearance: textfield;
		font: inherit;
		width: 100%;
		height: $size--40;
		min-width: $size--256;
		background-color: $color--white;
		border: 1px solid $color--beige-darker;
		border-radius: $size-radius--default;
		padding: $size--12 $size--16;
		@include set-focus {
			border: 1px solid $color--beige-darker;
			box-shadow: 0px 0px 0px 2px $color--beige-dark;
		}

		&:active {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--beige-darkest;
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
			color: $color--beige-darkest;
			border-color: $color--beige-darker;
			background-color: $color--beige-dark;
			box-shadow: none;
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}
		&::placeholder {
			color: $color--beige-darkest;
		}

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			/* display: none; <- Crashes Chrome on hover */
			-webkit-appearance: none;
			margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
		}
	}

	.sp-spinner--buttons {
		box-sizing: border-box;
		position: absolute;
		bottom: 0;
		right: 0;
		height: $size--40;
		visibility: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1px 1px 1px 0;
		// background-color: red;
	}
	.sp-spinner--buttons:hover,
	.sp-spinner--buttons--visible {
		visibility: visible;
	}

	button {
		box-sizing: border-box;
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
			stroke: $color--dark;
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
		&:hover:not(:disabled) {
			background-color: $color--beige-dark;
		}

		&:active:not(:disabled) {
			background-color: $color--beige-darker;
		}

		&:disabled {
			cursor: not-allowed;
			:global(svg path) {
				stroke: $color--beige-darkest;
			}
		}

		&.sp-spinner--button--up {
			svg {
				transform: rotate(180deg);
			}
		}
	}
</style>
