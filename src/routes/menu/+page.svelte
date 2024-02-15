<script lang="ts">
	import { Menu, Button, Icon, type MenuData, ComponentEvent } from '$lib';
	import { menuData } from './menu_data';

	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let menuVisible = $state(false);
	let data: MenuData[] = $state(menuData);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const buttonClickHandler = () => {
		menuVisible = !menuVisible;
	};

	const menuClickHandler = (event: ComponentEvent<string>) => {
		events.push(event.value);
	};

	const menuUpdateHandler = (event: ComponentEvent<string>) => {
		events.push(event.value);
	};

	// let dataStringed = $state(JSON.stringify(data));

	// $effect(() => {
	// 	data = JSON.parse(dataStringed);
	// });
</script>

<Layout
	component="Menu"
	example={source({ data, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Visible"
			bind:value={menuVisible} />
		<!-- <PropsChanger
			label="Data"
			bind:value={dataStringed} /> -->
		<PropsChanger
			label="Size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Button
				action={true}
				onButtonClick={buttonClickHandler}>
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
