<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Menu, Button, Icon, type MenuData } from '../../lib';
	import { logEvent } from 'histoire/client';
	import { menuData } from './menu_data';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let visible = true;
	let data: MenuData[] = menuData;

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
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div class="wrapper">
			<Button
				action={true}
				on:click={buttonClickHandler}>
				<Icon name="plus" />
			</Button>
			<br />
			<br />
			{#if visible}
				<Menu
					{data}
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
