<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Menu, Button, Icon, COLORS, type MenuData } from '../../lib';
	import { logEvent } from 'histoire/client';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let visible = true;
	let data: MenuData[] = [
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
								{
									label: 'Bengal tiger',
									id: 'bengal-tiger',
									meta: 'endangered',
								},
								{
									label: 'Siberian tiger',
									id: 'siberian-tiger',
									meta: 'endangered',
								},
								{
									label: 'Sumatran tiger',
									id: 'sumatran-tiger',
									meta: 'endangered',
								},
								{
									label: 'Caspian tiger',
									id: 'sumatran-tiger',
									meta: 'extinct',
								},
								{
									label: 'Indochinese tiger',
									id: 'indochinese-tiger',
									meta: 'endangered',
								},
								{
									label: 'Malayan tiger',
									id: 'malayan-tiger',
									meta: 'endangered',
								},
								{
									label: 'South China tiger',
									id: 'south-china-tiger',
									meta: 'endangered',
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
						{
							label: 'Strawberry',
							id: 'strawberry',
							meta: '(52)',
						},
						{
							label: 'Watermelon',
							id: 'watermelon',
							meta: '(3)',
						},
						{
							label: 'Apple',
							id: 'apple',
							submenu: [
								{
									label: 'Pink Lady ',
									id: 'pink-lady',
									meta: '(15)',
								},
								{
									label: 'Empire ',
									id: 'empire',
									meta: '(23)',
								},
								{
									label: 'Fuji ',
									id: 'fuji',
									meta: '(65)',
								},
								{
									label: 'Gala ',
									id: 'gala',
									meta: '(33)',
								},
								{
									label: 'Golden Delicious ',
									id: 'golden-delicious',
									meta: '(8)',
									selected: true,
								},
								{
									label: 'Granny Smith ',
									id: 'granny-smith',
									meta: '(80)',
								},
								{
									label: 'Honeycrisp ',
									id: 'honeycrisp',
									meta: '(102)',
								},
								{
									label: 'McIntosh ',
									id: 'mcintosh',
									meta: '(64)',
								},
							],
						},
						{
							label: 'Peach',
							id: 'peach',
							meta: '(18)',
						},
						{
							label: 'Banana',
							id: 'banana',
							submenu: [
								{
									label: 'Cavendish Banana',
									id: 'cavendish-banana',
									meta: '(23)',
								},
								{
									label: 'Pisang Raja',
									id: 'pisang-raja',
									meta: '(8)',
								},
								{
									label: 'Red Banana',
									id: 'red-banana',
									meta: '(12)',
								},
								{
									label: 'Lady Finger Banana',
									id: 'Lady finger-banana',
									meta: '(16)',
								},
								{
									label: 'Blue Java Banana',
									id: 'Blue java-banana',
									meta: '(5)',
								},
								{
									label: 'Plantain',
									id: 'plantain',
									meta: '(23)',
								},
								{
									label: 'Manzano Banana',
									id: 'manzano-banana',
									meta: '(9)',
								},
								{
									label: 'Burro Banana',
									id: 'burro-banana',
									meta: '(31)',
								},
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
