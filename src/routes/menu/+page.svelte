<script lang="ts">
	import { Menu, Button, Icon, type MenuData } from '$lib';
	import { menuData } from './menu_data';

	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let menuVisible = $state(false);
	let data: MenuData[] = $state(menuData);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const buttonClickHandler = () => {
		menuVisible = !menuVisible;
	};

	const menuClickHandler = (id: string) => {
		events.push(id);
	};

	const menuUpdateHandler = (id: string) => {
		events.push(id);
	};

	let dataStringed = $state(JSON.stringify(data));

	$effect(() => {
		data = JSON.parse(dataStringed);
	});
</script>

<Layout
	component="Menu"
	example={source(data, size)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Visible"
			checkbox
			bind:value={menuVisible} />
		<PropsChanger
			label="Data"
			object
			bind:value={dataStringed} />
		<PropsChanger
			label="Size"
			select
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Button
				action={true}
				onClick={buttonClickHandler}>
				<Icon
					name="plus"
					color="white" />
			</Button>
			<br />
			<br />
			{#if menuVisible}
				<Menu
					bind:data
					{size}
					onMenuUpdate={menuUpdateHandler}
					onMenuClick={menuClickHandler} />
			{/if}
		</div>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
