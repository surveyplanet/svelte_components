<script
	lang="ts"
	context="module">
	import { ComponentEvent } from './index';

	export type SpinnerProps = {
		label?: string;
		id?: string;
		step?: number;
		min: number;
		max: number;
		value?: number;
		disabled?: boolean;
		required?: boolean;
		overflow?: boolean;
		dragSpeed?: number;
		placeholder?: string;
		size?: 'small' | 'medium' | 'large';
		onSpinnerUpdate?: (event: ComponentEvent<number | undefined>) => void;
		onSpinnerInput?: (event: ComponentEvent<number | undefined>) => void;
		onSpinnerChange?: (event: ComponentEvent<number | undefined>) => void;
		onSpinnerBlur?: (event: ComponentEvent<undefined>) => void;
		onSpinnerFocus?: (event: ComponentEvent<undefined>) => void;
	};
</script>

<script lang="ts">
	let {
		label,
		id,
		step = 1, // common use case
		min,
		max,
		value,
		disabled,
		required,
		overflow,
		dragSpeed = 10, // common use case
		placeholder,
		size = 'small', // input sizes are small by default
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

	const changeValue = (event: Event, increment: boolean) => {
		let currentValue = value;

		if (currentValue === undefined) {
			currentValue = min;
		}

		let newValue = increment ? currentValue + step : currentValue - step;

		if (newValue !== value && newValue !== undefined) {
			value = checkOverflow(newValue);
			if (typeof onSpinnerUpdate === 'function') {
				const componentEvent = new ComponentEvent<number>(
					value,
					event.target!,
					event
				);
				onSpinnerUpdate(componentEvent);
			}
		}
		if (currentValue === undefined) {
			if (increment) {
				return checkOverflow(min + step);
			} else {
				return checkOverflow(max - step);
			}
		}
	};
	// do we really need this?
	// const reset = () => {
	// 	value = undefined;
	// 	if (onSpinnerUpdate) onSpinnerUpdate(value);
	// };

	const increment = (event: Event) => {
		changeValue(event, true);
	};

	const decrement = (event: Event) => {
		changeValue(event, false);
	};

	const inputChange = (event: Event, arrow?: string) => {
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
		if (typeof onSpinnerUpdate === 'function') {
			const componentEvent = new ComponentEvent<number>(
				value,
				event.target!,
				event
			);
			onSpinnerUpdate(componentEvent);
		}
	};
	// Mouse dragging

	const onMouseMove = (event: MouseEvent) => {
		// call changeValue every 10px the mouse moves
		if (event.clientX - startX > dragSpeed) {
			startX = event.clientX;
			changeValue(event, true);
		} else if (event.clientX - startX < -dragSpeed) {
			startX = event.clientX;
			changeValue(event, false);
		}
	};

	const stopDragging = () => {
		// isDragging = false;
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', stopDragging);
	};

	const checkForValueChange = (event: Event) => {
		if (value !== controlValue) {
			if (typeof onSpinnerInput === 'function') {
				const componentEvent = new ComponentEvent<number>(
					value ?? 0,
					event.target!,
					event
				);
				onSpinnerInput(componentEvent);
			}
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

	const upMouseDownHandler = (event: MouseEvent) => {
		// increment then use to delay for .5 sec before setting interval
		increment(event);

		spinnerTimeout = setTimeout(() => {
			spinnerInterval = setInterval(() => {
				increment(event);
			}, spinnerIntervalSpeed);
		}, 500);
	};

	const downMouseDownHandler = (event: MouseEvent) => {
		decrement(event);

		spinnerTimeout = setTimeout(() => {
			spinnerInterval = setInterval(() => {
				decrement(event);
			}, spinnerIntervalSpeed);
		}, 500);
	};
	const changeHandler = (event: Event) => {
		if (typeof onSpinnerChange === 'function') {
			const componentEvent = new ComponentEvent<number | undefined>(
				value,
				event.target!,
				event
			);
			onSpinnerChange(componentEvent);
		}
	};

	const inputHandler = (event: Event) => {
		inputChange(event, undefined);
	};
	const mouseUpHandler = () => {
		clearTimeout(spinnerTimeout);
		clearInterval(spinnerInterval);
	};

	const blurHandler = (event: FocusEvent) => {
		checkForValueChange(event);
		const componentEvent = new ComponentEvent<undefined>(
			undefined,
			event.target!,
			event
		);
		if (typeof onSpinnerBlur === 'function') onSpinnerBlur(componentEvent);
		visibleButtons = false;
	};

	const focusHandler = (event: FocusEvent) => {
		visibleButtons = true;
		const componentEvent = new ComponentEvent<undefined>(
			undefined,
			event.target!,
			event
		);
		if (typeof onSpinnerFocus === 'function')
			onSpinnerFocus(componentEvent);
	};
	const inputClickHandler = () => {
		if (input) input.focus();
	};
	const keydownHandler = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp') {
			inputChange(event, 'ArrowUp');
		} else if (event.key === 'ArrowDown') {
			inputChange(event, 'ArrowDown');
		}
		//  else if (event.key === 'Backspace' || event.key === 'Delete') {
		// 	reset();
		// }
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
		bind:this={input}
		class="sp-number-spinner--input"
		type="number"
		bind:value
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
