<script>export let breadcrumbs = [];
</script>

<nav class="sp-breadcrumbs">
	<ul>
		{#each breadcrumbs as breadcrumb, i}
			<li>
				<a
					class="sp-breadcrumbs--link"
					href={breadcrumb.url}>
					{breadcrumb.name}
				</a>
				{#if i !== breadcrumbs.length - 1}
					<span class="sp-breadcrumbs--divider">/</span>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<!-- Path: src/lib/Breadcrumbs.svelte -->
<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-breadcrumbs ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0;
}

.sp-breadcrumbs--link,
.sp-breadcrumbs--divider {
  display: inline-block;
  vertical-align: top;
  font: normal 700 0.875rem/140% "Suisse Screen Bold", "Helvetica Neue", Helvetica, Arial, sans-serif;
  white-space: nowrap;
  color: #737a87;
}

.sp-breadcrumbs--link {
  cursor: pointer;
  text-decoration: none;
  max-width: 16rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sp-breadcrumbs--link:hover {
  text-decoration: underline;
  color: #b598ff;
}
.sp-breadcrumbs--link:last-child {
  color: #162137;
}

.sp-breadcrumbs--divider {
  margin: 0 0.25rem;
  padding: 0;
}</style>
