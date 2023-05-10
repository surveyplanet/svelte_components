<script

	context="module"></script>

<script>import { createEventDispatcher } from "svelte";
import { Menu, Icon } from "./index";
import { onMount } from "svelte";
const dispatch = createEventDispatcher();
export let options;
export let value = null;
export let label = null;
export let searchThreshold = 15;
export let disabled = false;
export let required = false;
let input;
let visible = false;
let displayValue = "";
$:
  searchable = options.length >= searchThreshold;
$:
  MenuData = [...options];
onMount(() => {
  if (value?.length) {
    setValue(value, true);
  }
});
const reset = () => {
  MenuData = [...options];
  for (let item of MenuData) {
    item.selected = false;
  }
};
const setValue = (id, silent = false) => {
  value = id;
  displayValue = "";
  for (let item of MenuData) {
    item.selected = false;
    if (item.id === id) {
      item.selected = true;
      displayValue = item.label;
    }
  }
  if (!silent) {
    dispatch("change", value);
  }
};
const search = (query) => {
  query = query.toLowerCase().trim();
  if (query?.length) {
    visible = true;
    MenuData = options.filter((item) => {
      return item.label.toLowerCase().trim().includes(query);
    });
  } else {
    reset();
  }
};
const clear = () => {
  reset();
  setValue("");
  input.focus();
};
const menuClickHandler = (event) => {
  setValue(event.detail);
  visible = false;
};
const searchFocusHandler = () => {
  visible = true;
};
const searchBlurHandler = (event) => {
  const newFocusEl = event.relatedTarget || null;
  if (newFocusEl?.classList) {
    if (newFocusEl.classList.contains("sp-menu--item--btn")) {
      return;
    }
  }
  visible = false;
};
const searchKeyupHandler = (event) => {
  const target = event.target;
  search(target.value);
};
const closeButtonHandler = () => {
  clear();
};
const toggleIconClickHandler = () => {
  visible = !visible;
};
</script>

{#if label}
	<label
		for="sp-dropdown"
		class="sp-dropdown--label">
		{label}
		{#if required}
			<span class="sp-dropdown--label--required">*</span>
		{/if}
	</label>
{/if}

<div
	class="sp-dropdown"
	class:sp-dropdown--open={visible}>
	{#if searchable && displayValue?.length}
		<button
			class="sp-dropdown--close-btn"
			on:click={closeButtonHandler}>
			<Icon
				name="x"
				size={16} />
		</button>
	{/if}

	<input
		type="text"
		class="sp-dropdown--search"
		bind:this={input}
		{disabled}
		value={displayValue}
		readonly={!searchable}
		on:focus={searchFocusHandler}
		on:blur={searchBlurHandler}
		on:keyup={searchKeyupHandler} />

	<svg
		class="sp-dropdown--toggle-icon"
		width="7"
		height="4"
		viewBox="0 0 7 4"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		on:click={toggleIconClickHandler}
		on:keydown={toggleIconClickHandler}>
		<path
			d="M1.08984 0.830868L3.50606 3.24707L6.0002 0.75293"
			stroke="#162137"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round" />
	</svg>
</div>
{#if visible}
	<Menu
		data={MenuData}
		on:click={menuClickHandler} />
{/if}

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-dropdown {
  position: relative;
}
.sp-dropdown.sp-dropdown--open .sp-dropdown--toggle-icon {
  rotate: 180deg;
}

label {
  color: #162137;
  display: block;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  padding: 0 0 0.75rem 0.25rem;
}
label .sp-dropdown--label--required {
  color: #ffb1e3;
  font-size: 0.875rem;
}

input {
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 2.5rem;
  min-width: 16rem;
  background-color: #ffffff;
  border: 1px solid #dcdee1;
  border-radius: 5px;
  margin: 0;
  padding: 0 0 0 1rem;
  text-align: left;
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

.sp-dropdown--close-btn,
.sp-dropdown--toggle-icon {
  cursor: pointer;
  position: absolute;
  right: 1rem;
}

.sp-dropdown--toggle-icon {
  top: calc(50% - 2px);
}

.sp-dropdown--close-btn {
  top: calc(50% - 8px);
  border: none;
  width: 16px;
  height: 16px;
  min-width: auto;
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 3px;
  z-index: 1;
}
.sp-dropdown--close-btn:hover {
  background-color: #dcdee1;
}
.sp-dropdown--close-btn:hover :global(.sp-icon path) {
  stroke: white;
}</style>
