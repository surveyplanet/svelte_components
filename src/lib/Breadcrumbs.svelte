<script
	lang="ts"
	context="module">
	export interface BreadcrumbData {
		name: string;
		url?: string;
	}

	export type BreadcrumbsProps = {
		data: BreadcrumbData[];
	};
</script>

<script lang="ts">
	let { data } = $props<BreadcrumbsProps>();
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
