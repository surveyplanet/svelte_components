<script>import { createEventDispatcher } from "svelte";
import { COLORS, MASCOTS } from "./index";
const dispatch = createEventDispatcher();
const bgColors = [COLORS.blue, COLORS.green, COLORS.pink, COLORS.yellow];
const mascots = Object.keys(MASCOTS).map((key) => {
  return MASCOTS[key];
});
export let imgSrc;
export let id;
export let size = "medium";
export let disabled = false;
$: {
  if (!/^https?:\/\//.test(imgSrc)) {
    mascots[getPersistentIndex(mascots.length)];
  }
}
const getPersistentIndex = (length = 0) => {
  if (!id?.length) {
    return 0;
  }
  const charCode = id.trim().toLowerCase().charCodeAt(0);
  return charCode % length;
};
const getBgColor = () => {
  return bgColors[getPersistentIndex(bgColors.length)];
};
const clickHandler = (e) => {
  if (disabled) {
    return;
  }
  dispatch("click", e);
};
</script>

<button
	class="sp-avatar sp-avatar--{size}"
	on:click={clickHandler}
	style:background-color={getBgColor()}
	aria-label={disabled ? null : 'profile image'}
	role={disabled ? 'presentation' : null}
	{disabled}>
	<span class="sp-avatar--image">
		<img
			src={imgSrc}
			alt="profile" />
	</span>
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
.sp-avatar {
  box-sizing: border-box;
  display: inline-flex;
  height: 2.25rem;
  width: 2.25rem;
  padding: 0 0.25rem;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 100%;
  border: 0;
  overflow: hidden;
}
.sp-avatar:hover {
  cursor: pointer;
}
.sp-avatar:focus-visible {
  outline: none;
  border: 1px solid #162137;
}
@supports not selector(:focus-visible) {
  .sp-avatar:focus {
    outline: none;
    border: 1px solid #162137;
  }
}

.sp-avatar--medium {
  height: 3rem;
  width: 3rem;
}

.sp-avatar--large {
  height: 4rem;
  width: 4rem;
}

.sp-avatar--image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.sp-avatar--image img {
  max-width: 130%;
  height: auto;
}</style>
