<script lang="ts">
	import {
		NavBar,
		type MenuData,
		type NavBarData,
		ComponentEvent,
	} from '$lib/index';
	import { menuData } from '../menu/menu_data';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<string>[]>([]);

	let data: NavBarData[] = $state([
		{
			icon: 'edit',
			link: '#edit',
			id: 'edit',
			title: 'Edit',
		},
		{
			icon: 'share',
			id: 'share',
			title: 'Share',
		},
		{
			icon: 'chartColumn',
			link: '#charts',
			id: 'chart',
			title: 'Chart',
		},
	]);

	let navMenuData: MenuData[] = $state(menuData);
	let vertical = $state(false);

	const onNavClick = (event: ComponentEvent<string>) => {
		events.push(event);
	};

	// let dataString = $state(JSON.stringify(data));
	// let menuDataString = $state(JSON.stringify(navMenuData));

	// $effect(() => {
	// 	data = JSON.parse(dataString);
	// 	navMenuData = JSON.parse(menuDataString);
	// });
</script>

<Layout
	component="NavBar"
	example={source({ data, navMenuData, vertical })}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Data"
			bind:value={dataString} />
		<PropsChanger
			label="Menu Data"
			bind:value={menuDataString} /> -->
		<PropsChanger
			label="Vertical"
			bind:value={vertical} />
	{/snippet}
	{#snippet main()}
		<NavBar
			bind:data
			bind:navMenuData
			{vertical}
			{onNavClick} />
	{/snippet}
</Layout>

<style>
</style>
