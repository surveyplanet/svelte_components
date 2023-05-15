<script

	context="module"></script>

<script>export let footerData = [];
</script>

<nav class="sp-footer">
	<ul>
		{#each footerData as item}
			<li>
				<svelte:element
					this={item.link?.length ? 'a' : 'span'}
					class="sp-footer--item"
					href={item.link?.length ? item.link : void 0}>
					{item.label}
				</svelte:element>
			</li>
		{/each}
	</ul>
</nav>

<style>@charset "UTF-8";
/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-footer {
  font-family: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #b598ff;
  font: normal 400 0.75rem/130% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.sp-footer ul {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
.sp-footer .sp-footer--item {
  color: #b598ff;
  text-decoration: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
.sp-footer a:hover {
  text-decoration: underline;
}
.sp-footer ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
}
.sp-footer li {
  margin: 0;
  padding: 0;
}
.sp-footer li + li:before {
  content: "•";
  margin: 0 0.5rem;
}</style>
