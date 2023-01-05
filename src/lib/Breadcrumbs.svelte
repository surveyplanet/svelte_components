<script lang="ts">
	type Breadcrumb = {
		name: string;
		url: string;
	};
	export let breadcrumbs: Breadcrumb[] = [
		{
			name: 'Home',
			url: '/',
		},
		{
			name: 'Our test survey will show you how its done as an example ',
			url: '/about',
		},
		{
			name: 'Contact',
			url: '/contact',
		},
		{
			name: 'Submit',
			url: '/submit',
		},
	];
	export let onBreadcrumbClick = (breadcrumb: object) => {
		console.log(breadcrumb);
	};
</script>

<ul class="sp-breadcrumbs">
	{#each breadcrumbs as breadcrumb}
		<li>
			<a
				class="sp-breadcrumbs--breadcrumb"
				on:click={() => onBreadcrumbClick(breadcrumb)}
				href={breadcrumb.url}>
				{breadcrumb.name}
			</a>
			{#if breadcrumb !== breadcrumbs[breadcrumbs.length - 1]}
				<span>/</span>
			{/if}
		</li>
	{/each}
</ul>

<!-- Path: src/lib/Breadcrumbs.svelte -->
<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-breadcrumbs {
		align-items: baseline;
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
		font: $font--default;
	}
	.sp-breadcrumbs--breadcrumb {
		cursor: pointer;
		text-decoration: none;
		color: black;
		display: inline-block;
		@include truncate($size-gutter--quadruple);
	}
	.sp-breadcrumbs--breadcrumb:hover {
		text-decoration: underline;
	}
</style>
