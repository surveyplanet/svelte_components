<script lang="ts">
	import { NavBar, ComponentEvent, type NavBarProps } from '$lib/index';
	import { menuData } from '../menu/menu_data';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<string>[] = $state([]);

	let data: NavBarProps['data'] = $state([
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

	let navMenuData: NavBarProps['navMenuData'] = $state(menuData);
	let vertical: NavBarProps['vertical'] = $state(false);

	const onNavClick = (event: ComponentEvent<string>) => {
		events.push(event);
	};
</script>

<Layout
	component="NavBar"
	example={source({ data, navMenuData, vertical })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			bind:value={data} />
		<PropsChanger
			label="Menu Data"
			bind:value={navMenuData} />
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
