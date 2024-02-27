<script lang="ts">
	import { Menu, Button, Icon, ComponentEvent, type MenuProps } from '$lib';
	import { menuData } from './menu_data';

	import { Layout, PropsChanger } from '$layout';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<string, HTMLButtonElement>[] = $state([]);
	let menuVisible: boolean = $state(false);
	let data: MenuProps['data'] = $state(menuData);
	let size: MenuProps['size'] = $state('small');

	const buttonClickHandler = () => {
		menuVisible = !menuVisible;
	};

	const menuClickHandler = (
		event: ComponentEvent<string, HTMLButtonElement>
	) => {
		events.push(event);
	};

	const menuUpdateHandler = (
		event: ComponentEvent<string, HTMLButtonElement>
	) => {
		events.push(event);
	};
</script>

<Layout
	component="Menu"
	example={source({ data, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			bind:value={data} />
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
