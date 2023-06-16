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
					class="sp-footer--item"
					href={item.link?.length ? item.link : void 0}>
					{item.label}
				</svelte:element>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-footer {
		font-family: $font--default;
		font: $font--small;
		color: $color--beige-darkest;

		ul {
			display: flex;
			flex-flow: column wrap;
			justify-content: center;
			align-items: center;
		}

		.sp-footer--item {
			text-decoration: none;
			margin: 0;
			padding: 0;
			white-space: nowrap;
			color: $color--beige-darkest;
		}

		a:hover {
			text-decoration: underline;
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

		li {
			margin: 0;
			padding: 0;
			& + li {
				&:before {
					content: '\002022';
					margin: 0 $size-gutter--quarter;
				}
			}
		}
	}
</style>
