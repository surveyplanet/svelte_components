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

	const menuUpdateHandler = (e: CustomEvent) => {
		events.push('update');
	};

	const menuClickHandler = (e: CustomEvent) => {
		events.push('click');
	};

	const navLinkHandler = (e: CustomEvent) => {
		events.push('navLink');
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
				text="Data"
				value={JSON.stringify(data)}
				textInputHandler={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Menu Data"
				value={JSON.stringify(navMenuData)}
				textInputHandler={(e: Event) => {
					navMenuData = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Vertical"
				value={vertical.toString()}
				textInputHandler={(e: Event) => {
					vertical = (e.target as HTMLInputElement).value === 'true';
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
					on:navLink={navLinkHandler}
					on:update={menuUpdateHandler}
					on:click={menuClickHandler} />
				<div class="spacer" />
				<NavBar
					{data}
					{navMenuData}
					{vertical}
					on:navLink={navLinkHandler}
					on:update={menuUpdateHandler}
					on:click={menuClickHandler} />
			</div>
			<div class="wrapper">
				<NavBar
					{data}
					{navMenuData}
					{vertical}
					on:navLink={navLinkHandler}
					on:update={menuUpdateHandler}
					on:click={menuClickHandler} />
				<div class="spacer" />
				<NavBar
					{data}
					{navMenuData}
					{vertical}
					on:navLink={navLinkHandler}
					on:update={menuUpdateHandler}
					on:click={menuClickHandler} />
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
