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
