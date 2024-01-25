<script lang="ts">
	import { Menu, Button, Icon, type MenuData } from '$lib';
	import { menuData } from './menu_data';

	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	import type { StatusCodes } from '@surveyplanet/types';
	let events = $state([]) as string[];

	let menuVisible = $state(false);
	let data: MenuData[] = $state(menuData);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const buttonClickHandler = () => {
		menuVisible = !menuVisible;
	};

	const menuClickHandler = (id: string) => {
		events.push('click: ', id);
	};

	const menuUpdateHandler = (id: string) => {
		events.push('update: ', id);
	};
</script>

<Layout
	component="Menu"
	example={source(menuVisible, data, size)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Visible"
				value={menuVisible.toString()}
				oninput={(e: Event) => {
					menuVisible = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				text="Data"
				value={JSON.stringify(data)}
				oninput={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				select="Size"
				selectOptions={['small', 'medium', 'large']}
				value={size}
				oninput={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Button
				action={true}
				onclick={buttonClickHandler}>
				<Icon
					name="plus"
					color="white" />
			</Button>
			<br />
			<br />
			{#if menuVisible}
				<Menu
					{data}
					{size}
					menuUpdate={menuUpdateHandler}
					menuClick={menuClickHandler} />
			{/if}
		</div>
	</svelte:fragment>
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
