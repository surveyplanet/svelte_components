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
	{#each footerData as item}
		<a
			class="sp-footer--item"
			href={item.link}>{item.label}</a>
		{#if footerData.indexOf(item) < footerData.length - 1}
			<span class="sp-footer--divider"> · </span>
		{/if}
	{/each}
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
</style>
