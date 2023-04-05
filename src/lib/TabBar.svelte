<script lang="ts"
	context="module">
	import { Icon, type IconName } from './index';
	export interface tabBarData {
		id: string;
		label?: string;
		html?: string;
		icon?: IconName;
		selected?: boolean;
	}

</script>


<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { each } from 'svelte/internal';
    import Icon from './Icon.svelte';


	const dispatch: (name: string, index: number) => boolean =
		createEventDispatcher();

	/**
	 * Tab bar id
	 */

	export let id: string = (Date.now() + Math.random()).toString(36);
	/**
	 * Index position of the active tab
	 */
	export let activeIndex = 0;
	/**
	 * Force tab to consume all available space
	 */
	export let grow = false;
	/**
	 * A set of indexes (starting at 0) corresponding to tab buttons to disable.
	 */
	export let disabledIndexes: number[] = [];

	/**
	 * Objects to pass to the tab buttons
	 */
	export let data: tabBarData[] = []


</script>

<ul
	class="sp-tab-bar"
	{id}>
    {#each buttons as button, index}

</ul>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-tab-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
