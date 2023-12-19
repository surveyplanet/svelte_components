<script lang="ts">
	interface BreadcrumbOptions {
		name: string;
		url: string;
	}

	export let breadcrumbs: BreadcrumbOptions[] = [];
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
