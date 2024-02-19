<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export interface FooterData {
		link?: string;
		label: string;
	}

	export type FooterProps = HTMLAttributes<HTMLElement> & {
		footerData: FooterData[];
	};
</script>

<script lang="ts">
	let { footerData, ...attr } = $props<FooterProps>();
</script>

<nav
	class="sp-footer"
	{...attr}>
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
