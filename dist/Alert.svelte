<script>import { createEventDispatcher, onMount } from "svelte";
import { fly } from "svelte/transition";
import { cubicOut } from "svelte/easing";
import { COLORS, BUTTON_MODES, Button, Icon, TextInput } from "./";
const dispatch = createEventDispatcher();
const dispatchConfirm = createEventDispatcher();
export let title;
export let subtitle;
export let alertType = "success";
export let hideDelay = 0;
export let confirm = false;
export let confirmButtonLabel = "Confirm";
export let cancelButtonLabel = "Cancel";
export let challenge = "";
export let challengeLabel = "";
export let animationMilliseconds = 350;
let visible = false;
$:
  isChallenge = confirm && challenge.length > 0;
$:
  disableConfirmButton = isChallenge;
$: {
  if (!confirm && hideDelay > 0) {
    setTimeout(() => {
      visible = false;
    }, hideDelay);
  }
}
onMount(() => {
  visible = true;
});
const challengeKeyupHandler = (event) => {
  const input = event.detail.target;
  disableConfirmButton = input.value !== challenge;
};
const alertConfirmButtonClickHandler = () => {
  const value = isChallenge ? !disableConfirmButton : true;
  dispatchConfirm("confirm", value);
  visible = false;
};
const closeButtonClickHandler = () => {
  visible = false;
};
const introStartHandler = () => {
  dispatch("open");
};
const introEndHandler = () => {
  dispatch("in");
};
const outroStartHandler = () => {
  dispatch("close");
};
const outroEndHandler = () => {
  dispatch("out");
};
</script>

<!-- TODO: 'sp-alert--confirm' class is used in the nav and in the base component -->
{#if visible}
	<div
		role="alert"
		class="sp-alert sp-alert--{alertType}"
		class:sp-alert--confirm={confirm}
		class:sp-alert--challenge={isChallenge}
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		on:introstart={introStartHandler}
		on:introend={introEndHandler}
		on:outrostart={outroStartHandler}
		on:outroend={outroEndHandler}>
		<header class="sp-alert--header">
			{#if !confirm}
				<button
					on:click={closeButtonClickHandler}
					class="sp-alert--header--close-btn">
					<Icon
						color={COLORS.slate}
						name="x"
						size={20} />
				</button>
			{/if}

			{#if title?.length}
				<h3 class="sp-alert--header--title">{title}</h3>
			{/if}

			{#if subtitle?.length}
				<h4 class="sp-alert--header--subtitle">{subtitle}</h4>
			{/if}
		</header>

		<div class="sp-alert--body">
			<slot />
		</div>

		{#if confirm}
			<footer class="sp-alert--footer">
				{#if isChallenge}
					<div class="sp-alert--challenge">
						<TextInput
							id="defaultId"
							name="challenge"
							label={challengeLabel}
							placeholder={challenge}
							on:keyup={challengeKeyupHandler} />
					</div>
				{/if}
				<nav>
					<ul>
						<li class="sp-alert--confirm-btn">
							<Button
								disabled={disableConfirmButton}
								on:click={alertConfirmButtonClickHandler}
								mode={BUTTON_MODES.DARK}>
								{confirmButtonLabel}
							</Button>
						</li>
						<li class="sp-alert--close-btn">
							<Button
								on:click={closeButtonClickHandler}
								mode={BUTTON_MODES.LIGHT}>
								{cancelButtonLabel}
							</Button>
						</li>
					</ul>
				</nav>
			</footer>
		{/if}
	</div>
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
.sp-alert {
  position: absolute;
  z-index: 1000;
  min-width: 16rem;
  max-width: 16rem;
  padding: 2rem;
  position: relative;
  border: 1px solid #162137;
  border-radius: 5px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #ffffff;
}
.sp-alert.sp-alert--info {
  border-color: #78c4ee;
  color: #78c4ee;
}
.sp-alert.sp-alert--warning {
  border-color: #fac766;
  color: #fac766;
}
.sp-alert.sp-alert--error {
  border-color: #ea83c5;
  color: #ea83c5;
}
.sp-alert.sp-alert--success {
  border-color: #7be492;
  color: #7be492;
}

.sp-alert--header {
  position: relative;
}
.sp-alert--header .sp-alert--header--title {
  margin: 0;
  padding: 0;
}
.sp-alert--header .sp-alert--header--subtitle {
  margin: 0;
  padding: 0;
}
.sp-alert--header .sp-alert--header--close-btn {
  border-radius: 3px;
}
.sp-alert--header .sp-alert--header--close-btn:hover {
  background-color: #dcdee1;
}
.sp-alert--header .sp-alert--header--close-btn:hover :global(.sp-icon path) {
  stroke: white;
}

.sp-alert--header--close-btn {
  position: absolute;
  right: -1rem;
  top: -1rem;
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
}

.sp-alert--body {
  color: #737a87;
  padding-top: 1rem;
}
.sp-alert--body:empty {
  display: none;
}

.sp-alert--footer {
  padding-top: 1rem;
}
.sp-alert--footer ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.sp-alert--challenge {
  margin-bottom: 1rem;
}</style>
