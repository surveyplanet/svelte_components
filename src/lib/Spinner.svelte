<script
	lang="ts"
	context="module">
	export type SpinnerProps = {
		label?: string;
		id?: string;
		step?: number;
		min?: number;
		max?: number;
		value?: number;
		disabled?: boolean;
		required?: boolean;
		overflow?: boolean;
		dragSpeed?: number;
		placeholder?: string;
		size?: 'small' | 'medium' | 'large';
		onSpinnerUpdate?: (value: number | undefined) => void;
		onSpinnerInput?: (value: number | undefined) => void;
		onSpinnerChange?: (value: number | undefined) => void;
		onSpinnerBlur?: () => void;
		onSpinnerFocus?: () => void;
	};
</script>

<script lang="ts">
	let {
		label = '',
		id = (Date.now() + Math.random()).toString(36),
		step = 1,
		min = 0,
		max = 100,
		value,
		disabled = false,
		required = false,
		overflow = false,
		dragSpeed = 10,
		placeholder = null,
		size = 'small',
		onSpinnerUpdate,
		onSpinnerInput,
		onSpinnerChange,
		onSpinnerBlur,
		onSpinnerFocus,
	} = $props<SpinnerProps>();

	let input: HTMLInputElement | null = $state(null);

	let spinnerTimeout: ReturnType<typeof setTimeout>;

	let spinnerInterval: ReturnType<typeof setInterval>;

	let spinnerIntervalSpeed = 25;

	let controlValue: number | undefined = value;

	let startX: number;

	let visibleButtons = $state(false);

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
			if (onSpinnerUpdate) onSpinnerUpdate(value);
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
		if (onSpinnerUpdate) onSpinnerUpdate(value);
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
		if (onSpinnerUpdate) onSpinnerUpdate(value);
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
			if (onSpinnerInput) onSpinnerInput(value);
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
		if (onSpinnerChange) onSpinnerChange(value);
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
		if (onSpinnerBlur) onSpinnerBlur();
		visibleButtons = false;
	};

	const focusHandler = () => {
		visibleButtons = true;
		if (onSpinnerFocus) onSpinnerFocus();
	};
	const inputClickHandler = () => {
		if (input) input.focus();
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
		if (input) input.focus();
	};
	const spinnerBlurHandler = () => {
		if (input) input.blur();
	};
</script>

<div
	class="sp-spinner sp-spinner--{size}"
	onFocus={spinnerFocusHandler}
	onBlur={spinnerBlurHandler}>
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
		onblur={blurHandler}
		onchange={changeHandler}
		onfocus={focusHandler}
		oninput={inputHandler}
		onclick={inputClickHandler}
		onmousedown={mouseDragDownHandler}
		onkeydown={keydownHandler}
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
			onmousedown={upMouseDownHandler}
			onmouseup={mouseUpHandler}
			onchange={changeHandler}
			onblur={blurHandler}
			onfocus={focusHandler}>
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
			onmousedown={downMouseDownHandler}
			onmouseup={mouseUpHandler}
			onblur={blurHandler}
			onfocus={focusHandler}>
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
