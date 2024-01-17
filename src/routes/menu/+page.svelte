<script lang="ts">
	import { Menu, Button, Icon, type MenuData } from '$lib';
	import { menuData } from './menu_data';

	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let visible = $state(false);
	let data: MenuData[] = menuData;
	let size: 'small' | 'medium' | 'large' = 'small';

	const buttonClickHandler = () => {
		visible = !visible;
	};

	const menuClickHandler = (event: CustomEvent) => {
		events.push('click');
	};

	const menuUpdateHandler = (event: CustomEvent) => {
		events.push('update');
	};

	const menuBlurHandler = (event: CustomEvent) => {
		events.push('blur');
	};
</script>

<Layout
	component="Menu"
	example={source(visible, data, size)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Visible"
				value={visible.toString()}
				textInputHandler={(e: Event) => {
					visible = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Data"
				value={JSON.stringify(data)}
				textInputHandler={(e: Event) => {
					data = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Size"
				value={size}
				textInputHandler={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Button
				action={true}
				on:click={buttonClickHandler}>
				<Icon
					name="plus"
					color="white" />
			</Button>
			<br />
			<br />
			{#if visible}
				<Menu
					bind:data
					{size}
					on:update={menuUpdateHandler}
					on:click={menuClickHandler}
					on:blur={menuBlurHandler} />
			{/if}
		</div>
	</svelte:fragment>
</Layout>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
