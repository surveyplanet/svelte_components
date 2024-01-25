<script
	lang="ts"
	context="module">
	export interface FooterData {
		link?: string;
		label: string;
	}
</script>

<script lang="ts">
	let { footerData = [] } = $props<{ footerData: FooterData[] }>();
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
