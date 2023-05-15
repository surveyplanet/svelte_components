<script>import { createEventDispatcher } from "svelte";
export let label = "";
export let id = (Date.now() + Math.random()).toString(36);
export let step = 1;
export let min = 0;
export let max = 100;
export let value = void 0;
export let disabled = false;
export let required = false;
export let overflow = false;
export let placeholder = "";
export let dragSpeed = 10;
const dispatch = createEventDispatcher();
const dispatchFocus = createEventDispatcher();
const dispatchBlur = createEventDispatcher();
let input;
let spinnerTimeout;
let spinnerInterval;
let spinnerIntervalSpeed = 25;
let controlValue = value;
let startX;
let isDragging = false;
let visibleButtons = false;
const checkOverflow = (newValue) => {
  if (newValue === void 0) {
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
const changeValue = (increment2) => {
  let currentValue = value;
  if (currentValue === void 0) {
    currentValue = min;
  }
  let newValue = increment2 ? currentValue + step : currentValue - step;
  if (newValue !== value && newValue !== void 0) {
    value = checkOverflow(newValue);
    dispatch("update", value);
  }
  if (currentValue === void 0) {
    if (increment2) {
      return checkOverflow(min + step);
    } else {
      return checkOverflow(max - step);
    }
  }
};
const reset = () => {
  value = void 0;
  dispatch("update", value);
};
const increment = () => {
  changeValue(true);
};
const decrement = () => {
  changeValue(false);
};
const inputChange = (arrow) => {
  if (value === void 0) {
    return;
  }
  if (arrow === "ArrowUp" && value + step >= max) {
    value = checkOverflow(value + step);
  } else if (arrow === "ArrowDown" && value - step <= min) {
    value = checkOverflow(value - step);
  } else {
    value = checkOverflow(value);
  }
  dispatch("update", value);
};
const onMouseMove = (event) => {
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
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", stopDragging);
};
const checkForValueChange = () => {
  if (value !== controlValue) {
    dispatch("input", value);
  }
  controlValue = value;
};
const mouseDragDownHandler = (event) => {
  isDragging = true;
  startX = event.clientX;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", stopDragging);
};
const upMouseDownHandler = () => {
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
  dispatch("change", value);
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
  dispatchBlur("blur");
  visibleButtons = false;
};
const focusHandler = () => {
  dispatchFocus("focus");
  visibleButtons = true;
};
const inputClickHandler = () => {
  input.focus();
};
const keydownHandler = (event) => {
  if (event.key === "ArrowUp") {
    inputChange("ArrowUp");
  } else if (event.key === "ArrowDown") {
    inputChange("ArrowDown");
  } else if (event.key === "Backspace" || event.key === "Delete") {
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
	class="sp-spinner sp-spinner"
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

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-spinner {
  position: relative;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.sp-spinner:hover .sp-spinner--buttons {
  visibility: visible;
}

label {
  color: #162137;
  display: block;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  padding: 0 0 0.75rem 0.25rem;
}
label .sp-spinner--label--required {
  color: #ffb1e3;
  font-size: 0.875rem;
}

input {
  appearance: textfield;
  -moz-appearance: textfield;
  box-sizing: border-box;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  width: 100%;
  height: 2.5rem;
  min-width: 16rem;
  background-color: #ffffff;
  border: 1px solid #dcdee1;
  border-radius: 5px;
  padding: 0.75rem 1rem;
}
input:focus-visible {
  outline: none;
  box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
}
@supports not selector(:focus-visible) {
  input:focus {
    outline: none;
    box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
  }
}
input:active {
  border: 1px solid #e7e3ff;
  box-shadow: 0px 0px 0px 2px #f4f0ff;
}
input:hover {
  cursor: ew-resize;
}
input:read-only:focus-visible {
  outline: none;
  box-shadow: none;
}
@supports not selector(:focus-visible) {
  input:read-only:focus {
    outline: none;
    box-shadow: none;
  }
}
input:read-only:active {
  box-shadow: none;
}
input:disabled {
  cursor: not-allowed;
  color: #a2a6af;
  border-color: #a2a6af;
  background-color: rgba(0, 0, 0, 0.075);
  box-shadow: none;
}
input:disabled:focus-visible {
  outline: none;
  box-shadow: none;
}
@supports not selector(:focus-visible) {
  input:disabled:focus {
    outline: none;
    box-shadow: none;
  }
}
input:disabled:active {
  box-shadow: none;
}
input::placeholder {
  color: #a2a6af;
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.sp-spinner--buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2.5rem;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sp-spinner--buttons:hover,
.sp-spinner--buttons--visible {
  visibility: visible;
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
}
button svg path {
  stroke: #162137;
}
button:first-child {
  padding-top: 0.625rem;
  border-radius: 0 5px 0 0;
}
button:last-child {
  padding-bottom: 0.625rem;
  border-radius: 0 0 5px 0;
}
button:hover svg path {
  stroke: #b598ff;
}
button:active {
  background-color: #dcdee1;
}
button:active svg path {
  stroke: #162137;
}
button.sp-spinner--button--up svg {
  transform: rotate(180deg);
}</style>
