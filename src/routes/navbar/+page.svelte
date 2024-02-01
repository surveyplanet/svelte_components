<script lang="ts">
	import { NavBar, type MenuData, type NavBarData } from '$lib/index';
	import { menuData } from '../menu/menu_data';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let data: NavBarData[] = $state([
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
	]);

	let navMenuData: MenuData[] = $state(menuData);
	let vertical = $state(false);

	const menuUpdateHandler = (id: string) => {
		events.push(id);
	};

	const menuClickHandler = (id: string) => {
		events.push(id);
	};

	const navLinkHandler = (navLink: string) => {
		events.push(navLink);
	};
	let dataString = $state(JSON.stringify(data));
	let menuDataString = $state(JSON.stringify(navMenuData));

	$effect(() => {
		data = JSON.parse(dataString);
		navMenuData = JSON.parse(menuDataString);
	});
</script>

<Layout
	component="NavBar"
	example={source(data, navMenuData, vertical)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			object
			bind:value={dataString} />
		<PropsChanger
			label="Menu Data"
			object
			bind:value={menuDataString} />
		<PropsChanger
			label="Vertical"
			checkbox
			bind:value={vertical} />
	{/snippet}
	{#snippet main()}
		<div class="row-wrapper">
			<div class="wrapper">
				<NavBar
					bind:data
					bind:navMenuData
					{vertical}
					onnavlink={navLinkHandler}
					onupdate={menuUpdateHandler}
					onclick={menuClickHandler} />
			</div>
		</div>
	{/snippet}
</Layout>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		margin-right: 70px;
	}
	.spacer {
		height: 250px;
		width: 50px;
	}
	.row-wrapper {
		display: flex;
		flex-direction: row;
	}
</style>
