<script lang="ts">
	import { Menu, Button, Icon, ComponentEvent, type MenuProps } from '$lib';
	import { menuData } from './menu_data';

	import { Layout, PropsChanger } from '$layout';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<string, HTMLButtonElement>[] = $state([]);
	let visible: boolean = $state(true);
	let data: MenuProps['data'] = $state(menuData);
	let size: MenuProps['size'] = $state('small');

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
	let btoaProps = $derived(
		btoa(JSON.stringify({ data, size, visible: true }))
	);
</script>

<Layout
	{btoaProps}
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
		<PropsChanger
			label="Visible"
			bind:value={visible} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Menu
				bind:data
				{size}
				{visible}
				onMenuUpdate={menuUpdateHandler}
				onMenuClick={menuClickHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
