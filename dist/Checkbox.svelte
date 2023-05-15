<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let id = (Date.now() + Math.random()).toString(36);
export let name;
export let value = null;
export let label = "";
export let checked = false;
export let disabled = false;
export let prependLabel = false;
const changeEventHandler = (event) => {
  if (disabled) {
    return;
  }
  dispatch("change", event);
};
</script>

<input
	type="checkbox"
	{id}
	{name}
	{value}
	{checked}
	{disabled}
	{...$$restProps}
	on:change={changeEventHandler} />
<label
	class="sp-checkbox"
	class:sp-checkbox--prepend={prependLabel}
	for={id}>
	<span class="sp-checkbox--check">
		<svg
			width="12px"
			height="9px"
			viewBox="0 0 12 9">
			<polyline points="1 5 4 8 11 1" />
		</svg>
	</span>
	<span class="sp-checkbox--label">{label}</span>
</label>

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
@keyframes check {
  50% {
    transform: scale(1.2);
  }
}
.sp-checkbox {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.875rem;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
}
.sp-checkbox:hover .sp-checkbox--check {
  border-color: #737a87;
}
.sp-checkbox.sp-checkbox--prepend {
  flex-direction: row-reverse;
}

.sp-checkbox--check {
  position: relative;
  width: strip-unit(22)/16rem;
  height: strip-unit(22)/16rem;
  border-radius: 3px;
  transform: scale(1);
  border: 1px solid #a2a6af;
  transition: all 0.2s ease;
}
.sp-checkbox--check:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #b598ff;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 5px;
  transition-delay: 0.2s;
}
.sp-checkbox--check svg {
  position: absolute;
  z-index: 1;
  top: 7px;
  left: 5px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}

.sp-checkbox--label:empty {
  display: none;
}

input[type=checkbox] {
  appearance: none;
}
input[type=checkbox]:disabled + .sp-checkbox .sp-checkbox--check {
  border-color: #a2a6af;
  outline: unset;
  outline-offset: unset;
}
input[type=checkbox]:disabled + .sp-checkbox .sp-checkbox--label {
  color: #a2a6af;
}
input[type=checkbox]:checked + .sp-checkbox .sp-checkbox--check {
  border-color: #b598ff;
  background: #b598ff;
  animation: check 0.6s ease;
}
input[type=checkbox]:checked + .sp-checkbox .sp-checkbox--check svg {
  stroke-dashoffset: 0;
}
input[type=checkbox]:checked + .sp-checkbox .sp-checkbox--check:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}
input[type=checkbox]:focus-visible {
  outline: none;
}
input[type=checkbox]:focus-visible + .sp-checkbox .sp-checkbox--check {
  box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
}
@supports not selector(:focus-visible) {
  input[type=checkbox]:focus {
    outline: none;
  }
  input[type=checkbox]:focus + .sp-checkbox .sp-checkbox--check {
    box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
  }
}</style>
