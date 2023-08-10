<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { NavBar, type MenuData, type NavBarData } from '$lib/index';
	import { menuData } from '../menu/menu_data';
	import {default as source} from './source';

	export let Hst: Histoire;

	let data: NavBarData[] = [
		{
			icon: 'edit',
			link: '#',
			id: 'edit',
			title: 'Edit',
		},
		{
			icon: 'chartColumn',
			link: '#12',
			id: 'chart',
			title: 'Chart',
		},
		{
			icon: 'share',
			link: '#42',
			id: 'share',
			title: 'Share',
		},
	];

	let navMenuData: MenuData[] = menuData;
	let vertical = false;

	const menuUpdateHandler = (e: CustomEvent) => {
		logEvent('update', e.detail);
	};

	const menuClickHandler = (e: CustomEvent) => {
		logEvent('click', e.detail);
	};

	const navLinkHandler = (e: CustomEvent) => {
		logEvent('navLink', e.detail);
	};
</script>

<Hst.Story title="NavBar">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Data" />
		<Hst.Json
			bind:value={navMenuData}
			title="Menu Data" />
		<Hst.Checkbox
			bind:value={vertical}
			title="Vertical" />
	</svelte:fragment>

	<Hst.Variant title="NavBar"
		source={source(data, navMenuData, vertical)}
	>
		<div class="wrapper">
			<NavBar
				{data}
				{navMenuData}
				{vertical}
				on:navLink={navLinkHandler}
				on:update={menuUpdateHandler}
				on:click={menuClickHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>
