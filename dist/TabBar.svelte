<script

	context="module">import { Icon } from "./index";
</script>

<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let id = (Date.now() + Math.random()).toString(36);
export let grow = false;
export let data = [];
$:
  data = [...data];
const selectTabButton = (event) => {
  const target = event.target;
  const id2 = target.closest("li")?.id;
  for (let item of data) {
    console.log(id2);
    if (!item.disabled) {
      if (item.id === id2) {
        item.selected = true;
        dispatch("tabButton", id2);
      } else {
        item.selected = false;
      }
    }
  }
};
const tabButtonHandler = (event) => {
  selectTabButton(event);
};
</script>

<ul
	class="sp-tab-bar"
	class:sp-tab-bar--grow={grow}
	{id}>
	{#each data as item}
		<li
			class="sp-tab-bar--item"
			id={item.id}
			class:sp-tab-bar--item--active={item.selected}
			aria-selected={item.selected}>
			<button
				class="sp-tab-bar--button"
				class:sp-tab-bar--button--disabled={item.disabled}
				on:click={tabButtonHandler}>
				{#if item.label}
					<span class="sp-tab-bar--button--label">{item.label}</span>
				{/if}
				{#if item.html}
					<span class="sp-tab-bar--button--html">{item.html}</span>
				{/if}
				{#if item.icon}
					<Icon name={item.icon} />
				{/if}
			</button>
		</li>
	{/each}
</ul>

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-tab-bar {
  font: "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: relative;
}

ul {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #f4f0ff;
  border-radius: 100px;
  position: relative;
}

li {
  display: flex;
  margin: 0;
  padding: 0;
}

.sp-tab-bar--label {
  margin: 0;
  padding: 0.375rem;
}

button {
  display: flex;
  margin: 0;
  padding: 14px 16px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  line-height: inherit;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
}

button:focus {
  outline: none;
}

button:hover {
  background-color: white;
  border-radius: 100px;
}

.sp-tab-bar--item--active {
  background-color: white;
  border-radius: 100px;
}

.sp-tab-bar--button--disabled {
  pointer-events: none;
  background-color: #dcdee1;
  border-radius: 100px;
}

.sp-tab-bar--button--disabled:hover {
  background-color: #dcdee1;
}

.sp-tab-bar--grow {
  width: 100%;
}</style>
