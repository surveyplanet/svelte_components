<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Menu, Button, Icon, COLORS } from '../../lib';
	import { logEvent } from 'histoire/client';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let visible = true;
	let data = [
		{ label: 'Edit', id: 'edit' },
		{ label: 'Preview', id: 'preview' },
		{ label: 'Duplicate', id: 'duplicate' },
		{
			label: 'Categories',
			id: 'categories',
			submenu: [
				{
					label: 'Animals',
					id: 'animals',
					submenu: [
						{
							label: 'Tiger',
							id: 'tiger',
							submenu: [
								{ label: 'Bengal Tiger', id: 'bengal-tiger' },
								{
									label: 'Siberian Tiger',
									id: 'siberian-tiger',
								},
								{
									label: 'Sumatran Tiger',
									id: 'sumatran-tiger',
								},
								{
									label: 'Indochinese Tiger',
									id: 'indochinese-tiger',
								},
								{ label: 'Malayan Tiger', id: 'malayan-tiger' },
								{
									label: 'South China Tiger',
									id: 'south-china-tiger',
								},
							],
						},
						{ label: 'Elephant', id: 'elephant' },
						{ label: 'Monkey', id: 'monkey' },
					],
				},
				{
					label: 'Fruit',
					id: 'fruit',
					submenu: [
						{ label: 'Strawberry', id: 'strawberry' },
						{ label: 'Watermelon', id: 'watermelon' },
						{
							label: 'Apple',
							id: 'apple',
							submenu: [
								{ label: 'Pink Lady', id: 'pink-lady' },
								{ label: 'Empire', id: 'empire' },
								{ label: 'Fuji', id: 'fuji' },
								{ label: 'Gala', id: 'gala' },
								{
									label: 'Golden Delicious',
									id: 'golden-delicious',
									selected: true,
								},
								{ label: 'Granny Smith', id: 'granny-smith' },
								{ label: 'Honeycrisp', id: 'honeycrisp' },
								{ label: 'McIntosh', id: 'mcintosh' },
							],
						},
						{ label: 'Peach', id: 'peach' },
						{
							label: 'Banana',
							id: 'banana',
							submenu: [
								{
									label: 'Cavendish Banana',
									id: 'cavendish-banana',
								},
								{ label: 'Pisang Raja', id: 'pisang-raja' },
								{ label: 'Red Banana', id: 'red-banana' },
								{
									label: 'Lady Finger Banana',
									id: 'Lady finger-banana',
								},
								{
									label: 'Blue Java Banana',
									id: 'Blue java-banana',
								},
								{ label: 'Plantain', id: 'plantain' },
								{
									label: 'Manzano Banana',
									id: 'manzano-banana',
								},
								{ label: 'Burro Banana', id: 'burro-banana' },
							],
						},
					],
				},
				{
					label: 'New category',
					id: 'new-category',
					divide: true,
					icon: 'plus',
				},
			],
		},
		{
			label: 'Colors',
			id: 'colors',
			submenu: [
				{
					html: `<span class="color-chip" style="background-color: ${COLORS.yellow};"></span>`,
					// label: 'Yellow',
					id: 'yellow',
					inline: true,
				},
				{
					html: `<span class="color-chip" style="background-color: ${COLORS.purple};"></span>`,
					// label: 'Purple',
					id: 'purple',
					inline: true,
					selected: true,
				},
				{
					html: `<span class="color-chip" style="background-color: ${COLORS.blue};"></span>`,
					// label: 'Blue',
					id: 'blue',
					inline: true,
				},
				{
					html: `<span class="color-chip" style="background-color: ${COLORS.pink};"></span>`,
					// label: 'Pink',
					id: 'pink',
					inline: true,
				},
				{
					html: `<span class="color-chip" style="background-color: ${COLORS.green};"></span>`,
					// label: 'Green',
					id: 'green',
					inline: true,
				},
			],
		},
		{ label: 'Delete', id: 'delete', divide: true },
	];

	const buttonClickHandler = (e) => {
		visible = !visible;
	};

	const menuClickHandler = (e) => {
		visible = false;
		logEvent('click', e);
	};

	const menuUpdateHandler = (e) => {
		logEvent('update', e);
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
					on:click={menuClickHandler} />
			{/if}
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
