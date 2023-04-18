<script
	lang="ts"
	context="module">
	export interface FooterData {
		link?: string;
		label: string;
	}
</script>

<script lang="ts">
	export let footerData: FooterData[] = [];
</script>

<nav class="sp-footer">
	<ul>
		{#each footerData as item}
			<li>
				<svelte:element
					this={item.link?.length ? 'a' : 'span'}
					href={item.link?.length ? item.link : void 0}
					class="sp-footer--item">{item.label}</svelte:element>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-footer {
		font-family: $font--default;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		a {
			text-decoration: none;
			padding: 0.5rem;
			color: $color--purple;
		}
		.sp-footer--divider {
			color: $color--purple;
			padding: 0.5rem;
		}
	}
	// add separator dots
	ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
	}
</style>
