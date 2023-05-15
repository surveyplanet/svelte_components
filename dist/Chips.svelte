<script

	context="module"></script>

<script>import { createEventDispatcher } from "svelte";
export let data = [];
export let multiple = false;
const dispatch = createEventDispatcher();
const chipClickHandler = (e) => {
  const target = e.target;
  toggleSelected(target.id);
  dispatch("click", target.id);
};
const toggleSelected = (id) => {
  for (let chip of data) {
    if (chip.id === id) {
      chip.selected = !chip.selected;
    } else if (!multiple) {
      chip.selected = false;
    }
  }
};
</script>

<div class="sp-chips">
	{#each data as chip}
		<button
			class="sp-chips--button"
			class:sp-chips--button--selected={chip.selected}
			id={chip.id}
			on:click={chipClickHandler}
			title={chip.title}>
			{chip.label}
		</button>
	{/each}
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
.sp-chips {
  display: flex;
  align-items: center;
  margin: 2rem;
  padding: 2rem;
  list-style: none;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.sp-chips--button {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 20px;
  margin: 0.5rem;
  width: fit-content;
  height: 32px;
  background: #ffffff;
  border: 1px solid #ebe6d7;
  border-radius: 66px;
  flex: none;
  order: 2;
  flex-grow: 0;
}

.sp-chips--button--selected {
  background: linear-gradient(180deg, #bdffd8 0%, #f7f5af 100%);
  border-radius: 60px;
}</style>
