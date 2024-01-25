<script lang="ts">
	import { NavBar, type MenuData, type NavBarData } from '$lib/index';
	import { menuData } from '../menu/menu_data';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
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
</script>

<Layout
	component="NavBar"
	example={source(data, navMenuData, vertical)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				object="Data"
				value={JSON.stringify(data)}
				oninput={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				object="Menu Data"
				value={JSON.stringify(navMenuData)}
				oninput={(e: Event) => {
					navMenuData = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				boolean="Vertical"
				value={vertical.toString()}
				oninput={(e: Event) => {
					vertical = (e.target as HTMLInputElement).checked;
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="row-wrapper">
			<div class="wrapper">
				<NavBar
					{data}
					{navMenuData}
					{vertical}
					onnavlink={navLinkHandler}
					onupdate={menuUpdateHandler}
					onclick={menuClickHandler} />
			</div>
		</div>
	</svelte:fragment>
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
