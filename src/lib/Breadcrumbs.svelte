<script lang="ts">
	export let title: string = 'Breadcrumbs';
	export let breadcrumbs: object[] = [
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
	];
	export let onBreadcrumbClick = (breadcrumb: object) => {
		console.log(breadcrumb);
	};
</script>

<!-- Path: src/lib/Breadcrumbs.svelte -->
<p>
	{title}
</p>
<ul class="sp-breadcrumbs">
	{#each breadcrumbs as breadcrumb}
		<li>
			<a
				class="sp-breadcrumbs--breadcrumb"
				on:click={() => onBreadcrumbClick(breadcrumb)}
				href={breadcrumb.url}>
				{#if breadcrumb.name.length > 20}
					{breadcrumb.name.slice(0, 20)}... /
				{:else}
					{breadcrumb.name} /
				{/if}
			</a>
		</li>
	{/each}
</ul>

<!-- Path: src/lib/Breadcrumbs.svelte -->
<style lang="scss">
	@use './node_modules/@surveyplanet/styles/index.scss' as *;
	.sp-breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
		font: $font--default;
	}
	.sp-breadcrumbs--breadcrumb {
		cursor: pointer;
	}
	.sp-breadcrumbs--breadcrumb:hover {
		text-decoration: underline;
	}
	a {
		text-decoration: none;
		color: black;
	}
</style>
