<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Menu, Button, Icon, type MenuData } from '../../lib';
	import { logEvent } from 'histoire/client';
	import { menuData } from './menu_data';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let visible = true;
	let data: MenuData[] = menuData;
	let size: 'small' | 'medium' | 'large' = 'small';

	const buttonClickHandler = () => {
		visible = !visible;
	};

	const menuClickHandler = (event: CustomEvent) => {
		visible = false;
		logEvent('click', event);
	};

	const menuUpdateHandler = (event: CustomEvent) => {
		logEvent('update', event);
	};

	const menuBlurHandler = (event: CustomEvent) => {
		logEvent('blur', event);
	};
</script>

<Hst.Story title="Menu">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Menu Items" />

		<Hst.Select
			bind:value={size}
			title="Size"
			options={['small', 'medium', 'large']} />
	</svelte:fragment>

	<Hst.Variant title="Primary">
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
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
