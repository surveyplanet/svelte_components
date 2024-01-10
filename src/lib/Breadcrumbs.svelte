<script lang="ts">
	interface BreadcrumbOptions {
		name: string;
		url?: string; // last item doesn't need a url
	}

	export let data: BreadcrumbOptions[] = [];
</script>

<nav class="sp-breadcrumbs">
	<ul>
		{#each data as item, i}
			<li>
				<a
					class="sp-breadcrumbs--item"
					href={item.url || '#'}>
					{item.name}
				</a>

				{#if i !== data.length - 1}
					<span class="sp-breadcrumbs--divider">/</span>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
