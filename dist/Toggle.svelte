<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let id = (Date.now() + Math.random()).toString(36);
export let name;
export let disabled = false;
export let on = false;
export let tall = false;
export let label = null;
export let prependLabel = false;
export let amPmSwitch = false;
const changeHandler = (event) => {
  if (disabled) {
    on = false;
    return event.preventDefault();
  }
  dispatch("change", on);
};
</script>

{#if label?.length && prependLabel}
	<label
		class="sp-toggle--label sp-toggle--label-prepend"
		for={id}>{label}</label>
{/if}

<div
	class="sp-toggle sp-toggle--{on ? 'on' : 'off'}"
	class:sp-toggle--tall={tall}
	role="switch"
	aria-checked={on}>
	<input
		type="checkbox"
		bind:checked={on}
		{id}
		{name}
		{disabled}
		on:change={changeHandler} />

	<div class="sp-toggle--track" />
</div>
{#if amPmSwitch}
	<label
		class="sp-toggle--label sp-toggle--label-am-pm"
		for={id}>{'AM PM'}</label>
{:else if label?.length && !prependLabel}
	<label
		class="sp-toggle--label"
		for={id}>{label}</label>
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
.sp-toggle {
  display: inline-block;
  position: relative;
  width: 2.5rem;
  height: 1.25rem;
}
.sp-toggle:focus-visible {
  outline: none;
}
.sp-toggle:focus-visible .sp-toggle--track {
  box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
}
@supports not selector(:focus-visible) {
  .sp-toggle:focus {
    outline: none;
  }
  .sp-toggle:focus .sp-toggle--track {
    box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
  }
}
.sp-toggle input[type=checkbox] {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.sp-toggle input[type=checkbox]:checked + .sp-toggle--track {
  background-color: #162137;
}
.sp-toggle input[type=checkbox]:checked + .sp-toggle--track:after {
  transform: translateX(calc(100% + 4px));
}
.sp-toggle input[type=checkbox]:focus-visible {
  outline: none;
}
.sp-toggle input[type=checkbox]:focus-visible + .sp-toggle--track {
  box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
}
@supports not selector(:focus-visible) {
  .sp-toggle input[type=checkbox]:focus {
    outline: none;
  }
  .sp-toggle input[type=checkbox]:focus + .sp-toggle--track {
    box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
  }
}
.sp-toggle input[type=checkbox]:disabled + .sp-toggle--track {
  background-color: #dcdee1;
}
.sp-toggle .sp-toggle--track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  background-color: #ece5ff;
  transition: transform 400ms, background-color 400ms;
}
.sp-toggle .sp-toggle--track:after {
  position: absolute;
  content: "";
  height: calc(1.25rem - 4px);
  width: calc(1.25rem - 4px);
  left: 2px;
  top: 2px;
  background-color: #ffffff;
  transition: transform 400ms, background-color 400ms;
  border-radius: 50%;
}
.sp-toggle.sp-toggle--tall {
  width: 2.25rem;
  height: 1.5rem;
}
.sp-toggle.sp-toggle--tall .sp-toggle--track:after {
  position: absolute;
  content: "";
  height: calc(1.5rem - 4px);
  width: calc(1.5rem - 4px);
}
.sp-toggle.sp-toggle--tall input[type=checkbox]:checked + .sp-toggle--track:after {
  transform: translateX(calc(100% - 8px));
}

.sp-toggle--label-am-pm {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  padding-left: 0.5rem;
}

.sp-toggle--label {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  padding-left: 0.5rem;
}</style>
