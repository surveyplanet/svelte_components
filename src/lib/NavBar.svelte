<script
	context="module"
	lang="ts">
	import { Icon, type IconName } from './index';

	export type NavBarData = {
		icon: IconName;
		title?: string;
		link: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch: (name: string, detail: string) => boolean =
		createEventDispatcher();

	export let data: NavBarData[] = [];
</script>

<nav>
	{#each data as item}
		<a href={item.link}>
			{#if item.title}
				{item.title}
			{/if}

			<Icon name={item.icon} /></a>
	{/each}
</nav>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	nav {
		display: flex;
		max-width: fit-content;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: $size--18;
	}
</style>
