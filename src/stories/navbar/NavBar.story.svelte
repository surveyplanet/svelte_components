<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { NavBar, type MenuData, type NavBarData } from '../../lib/index';
	import { menuData } from '../menu/menu_data';

	export let Hst: Histoire;

	let data: NavBarData[] = [
		{
			icon: 'edit',
			link: '#',
			id: 'edit',
		},
		{
			icon: 'chartColumn',
			link: '#12',
			id: 'chart',
		},
		{
			icon: 'share',
			link: '#42',
			id: 'share',
		},
	];

	let navMenuData: MenuData[] = menuData;
</script>

<Hst.Story title="NavBar">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Data" />
	</svelte:fragment>

	<Hst.Variant title="NavBar">
		<NavBar
			{data}
			{navMenuData} />
	</Hst.Variant>
</Hst.Story>
