<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let id = (Date.now() + Math.random()).toString(36);
export let name;
export let value = null;
export let label = "";
export let checked = false;
export let disabled = false;
export let prependLabel = false;
export let attr = {};
const changeEventHandler = (event) => {
  if (disabled) {
    return;
  }
  dispatch("change", event);
};
</script>

<input
	type="radio"
	{name}
	{id}
	{value}
	{checked}
	{disabled}
	{...attr}
	on:change={changeEventHandler} />

<label
	class="sp-radio"
	class:sp-radio--prepend={prependLabel}
	for={id}>
	<span class="sp-radio--dot">
		<svg
			width="16px"
			height="16px"
			viewBox="0 0 16 16">
			<circle
				cx="8"
				cy="8"
				r="50%" />
		</svg>
	</span>
	<span class="sp-radio--label">{label}</span>
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
.sp-radio {
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
.sp-radio:hover .sp-radio--dot {
  border-color: #737a87;
}
.sp-radio.sp-radio--prepend {
  flex-direction: row-reverse;
}

.sp-radio--dot {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  transform: scale(1);
  border: 1px solid #a2a6af;
  transition: all 0.2s ease;
}
.sp-radio--dot:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #b598ff;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}
.sp-radio--dot svg {
  position: absolute;
  z-index: 1;
  top: 4px;
  left: 4px;
  fill: transparent;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}

.sp-radio--label:empty {
  display: none;
}

input[type=radio] {
  appearance: none;
  margin: 0;
  padding: 0;
}
input[type=radio]:disabled + .sp-radio .sp-radio--dot {
  border-color: #a2a6af;
  outline: unset;
  outline-offset: unset;
}
input[type=radio]:disabled + .sp-radio .sp-radio--label {
  color: #a2a6af;
}
input[type=radio]:checked + .sp-radio .sp-radio--dot {
  border-color: #b598ff;
  background: transparent;
  animation: check 0.6s ease;
}
input[type=radio]:checked + .sp-radio .sp-radio--dot svg {
  fill: #b598ff;
}
input[type=radio]:checked + .sp-radio .sp-radio--dot:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}
input[type=radio]:focus-visible {
  outline: none;
}
input[type=radio]:focus-visible + .sp-radio .sp-radio--dot {
  box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
}
@supports not selector(:focus-visible) {
  input[type=radio]:focus {
    outline: none;
  }
  input[type=radio]:focus + .sp-radio .sp-radio--dot {
    box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
  }
}</style>
