<script

	context="module">export const BUTTON_MODES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  QUATERNARY: "quaternary",
  DARK: "dark",
  LIGHT: "light"
};
</script>

<script>import { createEventDispatcher } from "svelte";
const dispatchClick = createEventDispatcher();
export let mode = BUTTON_MODES.PRIMARY;
export let disabled = false;
export let loader = false;
export let round = false;
export let block = false;
export let action = false;
export let type = "button";
export let form = null;
export let size = "medium";
let clickAnimationEl;
let active = false;
const clickHandler = (e) => {
  dispatchClick("click", e);
};
const mouseUpHandler = () => {
  deactivate();
};
const mouseDownHandler = (e) => {
  const target = e.target;
  const btn = target.closest("button");
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  activate(x, y);
};
const deactivate = () => {
  active = false;
};
const activate = (mouseX, mouseY) => {
  active = true;
  let w = clickAnimationEl.offsetWidth * 0.5;
  let h = clickAnimationEl.offsetHeight * 0.5;
  clickAnimationEl.style.left = `${mouseX - w}px`;
  clickAnimationEl.style.top = `${mouseY - h}px`;
};
</script>

<button
	{type}
	{disabled}
	{form}
	{...$$restProps}
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:sp-button--round={round}
	class:sp-button--loader={loader}
	class:sp-button--active={active}
	class:sp-button--block={block}
	class:sp-button--action={action}
	on:click={clickHandler}
	on:mouseup={mouseUpHandler}
	on:mousedown={mouseDownHandler}>
	<span
		class="sp-button--ripple"
		aria-hidden="true"
		bind:this={clickAnimationEl} />

	<span class="sp-button--label"><slot /></span>
</button>

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes fadeinout {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.sp-button {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  height: 2.5rem;
  padding: 1px 1.25rem 0;
  border: 0;
  border-radius: 5px;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #b598ff;
  color: #162137;
}
.sp-button:before {
  content: "";
  position: absolute;
  display: block;
  z-index: 0;
  width: 150%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(90deg, #9a79ed 75%, transparent 100%);
  opacity: 0;
  transform: translateX(-150%);
  transition-timing-function: ease-out;
  transition: transform 500ms, opacity 500ms;
}
.sp-button:hover:before {
  opacity: 1;
  transform: translateX(0);
}
.sp-button:focus-visible {
  outline: none;
  border: 1px solid #162137;
}
@supports not selector(:focus-visible) {
  .sp-button:focus {
    outline: none;
    border: 1px solid #162137;
  }
}
.sp-button.sp-button--block {
  display: block;
  width: 100%;
}
.sp-button.sp-button--round {
  border-radius: 2rem;
}
.sp-button.sp-button--action {
  width: 2rem;
  height: 2rem;
  padding: 0;
}
.sp-button.sp-button--action .sp-button--label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.sp-button.sp-button--secondary {
  background-color: #ffe978;
}
.sp-button.sp-button--secondary:before {
  background-image: linear-gradient(90deg, #fac766 75%, transparent 100%);
}
.sp-button.sp-button--secondary .sp-button--ripple {
  background: #ffe978;
  background: radial-gradient(circle, #ffe978 0%, transparent 60%);
}
.sp-button.sp-button--tertiary {
  background-color: #a1fda5;
}
.sp-button.sp-button--tertiary:before {
  background-image: linear-gradient(90deg, #7be492 75%, transparent 100%);
}
.sp-button.sp-button--tertiary .sp-button--ripple {
  background: #a1fda5;
  background: radial-gradient(circle, #a1fda5 0%, transparent 60%);
}
.sp-button.sp-button--quaternary {
  background-color: #9ee4fa;
}
.sp-button.sp-button--quaternary:before {
  background-image: linear-gradient(90deg, #78c4ee 75%, transparent 100%);
}
.sp-button.sp-button--quaternary .sp-button--ripple {
  background: #9ee4fa;
  background: radial-gradient(circle, #9ee4fa 0%, transparent 60%);
}
.sp-button.sp-button--dark {
  background-color: #162137;
  color: #dcdee1;
}
.sp-button.sp-button--dark :global(svg path) {
  stroke: #dcdee1;
}
.sp-button.sp-button--dark:before {
  background-image: linear-gradient(90deg, #454d5f 75%, #454d5f 100%);
}
.sp-button.sp-button--dark .sp-button--ripple {
  background: radial-gradient(circle, #162137 0%, transparent 60%);
}
.sp-button.sp-button--light {
  background-color: #ffffff;
  box-shadow: inset 0px 0px 0px 1px #dcdee1;
}
.sp-button.sp-button--light:before {
  background: unset;
  background-image: unset;
}
.sp-button.sp-button--light:hover {
  box-shadow: inset 0px 0px 0px 1px #c4c7cd;
}
.sp-button.sp-button--light:active {
  box-shadow: inset 0px 0px 0px 1px #737a87;
}
.sp-button.sp-button--light .sp-button--ripple {
  display: none;
}
.sp-button.sp-button--small {
  font-size: 0.75rem;
  padding: 0 1rem;
  height: 1.5rem;
}
.sp-button.sp-button--small.sp-button--action {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
}
.sp-button.sp-button--small .sp-button--label {
  column-gap: 0.125rem;
}
.sp-button.sp-button--small :global(svg) {
  width: 16px;
  height: 16px;
}
.sp-button.sp-button--large {
  font-size: 1rem;
  padding: 0 2rem;
  height: 3rem;
}
.sp-button.sp-button--large.sp-button--action {
  width: 3rem;
  height: 3rem;
  padding: 0;
}
.sp-button.sp-button--large .sp-button--label {
  column-gap: 0.5rem;
}
.sp-button.sp-button--large :global(svg) {
  width: 24px;
  height: 24px;
}
.sp-button:disabled:not(.sp-button--loader) {
  cursor: default !important;
  color: #dbccff;
  background: #ece5ff;
}
.sp-button:disabled:not(.sp-button--loader) :global(svg path) {
  stroke: #dbccff;
}
.sp-button:disabled:not(.sp-button--loader):before {
  background: unset;
  background-image: unset;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--secondary {
  color: #fac766;
  background-color: #fff5bc;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--secondary :global(svg path) {
  stroke: #fac766;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--tertiary {
  color: #7be492;
  background-color: #d9fedb;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--tertiary :global(svg path) {
  stroke: #7be492;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--quaternary {
  color: #78c4ee;
  background-color: #d8f4fd;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--quaternary :global(svg path) {
  stroke: #78c4ee;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--dark {
  color: #737a87;
  background-color: #dcdee1;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--dark :global(svg path) {
  stroke: #737a87;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--light {
  color: #dcdee1;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 0px 1px #dcdee1;
}
.sp-button:disabled:not(.sp-button--loader).sp-button--light :global(svg path) {
  stroke: #dcdee1;
}
.sp-button.sp-button--loader {
  position: relative;
  transition: none;
}
.sp-button.sp-button--loader:disabled .sp-button--label {
  visibility: hidden;
  opacity: 0;
}
.sp-button.sp-button--loader:before {
  background: unset;
  background-image: unset;
}
.sp-button.sp-button--loader:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  display: none;
  width: 1rem;
  height: 1rem;
  top: calc(50% - 8px);
  left: calc(50% - 8px);
  border: 2px solid #162137;
  border-top: 2px solid transparent;
  border-radius: 100%;
  animation: spin 1s linear infinite;
}
.sp-button.sp-button--loader:disabled {
  cursor: default !important;
}
.sp-button.sp-button--loader:disabled:after {
  display: block;
}
.sp-button.sp-button--loader.sp-button--dark:after {
  border-color: transparent #ffffff #ffffff;
}
.sp-button.sp-button--loader.sp-button--small:after {
  width: 0.75rem;
  height: 0.75rem;
  top: calc(50% - 6px);
  left: calc(50% - 6px);
}
.sp-button.sp-button--loader.sp-button--large:after {
  width: 1.125rem;
  height: 1.125rem;
  top: calc(50% - 9px);
  left: calc(50% - 9px);
}
.sp-button .sp-button--label {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.375rem;
  position: relative;
  z-index: 2;
}
.sp-button .sp-button--label:empty {
  display: none;
}
.sp-button .sp-button--ripple {
  position: absolute;
  z-index: 1;
  left: calc(50% - strip-unit(150)/16rem * 0.5);
  top: calc(50% - strip-unit(150)/16rem * 0.5);
  width: strip-unit(150)/16rem;
  height: strip-unit(150)/16rem;
  display: block;
  border-radius: 2.5rem;
  transform: scale(0.1);
  opacity: 0;
  background: #b598ff;
  background: radial-gradient(circle, #b598ff 50%, transparent 60%);
  transition-timing-function: ease-out;
  transition: transform 150ms, opacity 150ms;
}
.sp-button.sp-button--active .sp-button--ripple {
  transform: scale(1);
  opacity: 1;
}</style>
