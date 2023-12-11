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

<!-- Path: src/lib/Breadcrumbs.svelte -->
<style lang="scss">
	@use '@surveyplanet/styles' as *;

	:global(.sp-breadcrumbs--link) {
		color: $color--beige-darkest;
		&:hover {
			color: inherit;
		}
		&:last-child {
			color: $color--dark;
		}
	}

	:global(.sp-breadcrumbs--divider) {
		color: $color--beige-darkest;
	}

	.sp-breadcrumbs ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0; // remove the space between inline-block elements
	}

	.sp-breadcrumbs--link,
	.sp-breadcrumbs--divider {
		display: inline-block;
		vertical-align: top;
		font: $font--default;
		font-weight: $font-weight--medium;
		white-space: nowrap;
	}

	.sp-breadcrumbs--link {
		cursor: pointer;
		text-decoration: none;
		@include truncate($size-gutter--quadruple);
		&:hover {
			text-decoration: underline;
		}
	}

	.sp-breadcrumbs--divider {
		margin: 0 $size--4;
		padding: 0;
	}
</style>
