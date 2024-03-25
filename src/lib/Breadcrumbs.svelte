<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export interface BreadcrumbData {
		name: string;
		url?: string;
	}

	export type BreadcrumbsProps = HTMLAttributes<HTMLElement> & {
		data: BreadcrumbData[];
	};
</script>

<script lang="ts">
	let { data, ...attr }: BreadcrumbsProps = $props();
</script>

<nav
	class="sp-breadcrumbs"
	{...attr}>
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
