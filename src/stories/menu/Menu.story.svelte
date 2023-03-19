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
								{
									html: 'Bengal tiger <span class="sp-menu-item--meta">endangered</span>',
									id: 'bengal-tiger',
								},
								{
									html: 'Siberian tiger <span class="sp-menu-item--meta">endangered</span>',
									id: 'siberian-tiger',
								},
								{
									html: 'Sumatran tiger <span class="sp-menu-item--meta">endangered</span>',
									id: 'sumatran-tiger',
								},
								{
									html: 'Caspian tiger <span class="sp-menu-item--meta">extinct</span>',
									id: 'sumatran-tiger',
								},
								{
									html: 'Indochinese tiger <span class="sp-menu-item--meta">endangered</span>',
									id: 'indochinese-tiger',
								},
								{
									html: 'Malayan tiger <span class="sp-menu-item--meta">endangered</span>',
									id: 'malayan-tiger',
								},
								{
									html: 'South China tiger <span class="sp-menu-item--meta">endangered</span>',
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
						{
							html: 'Strawberry<span class="sp-menu-item--meta">(52)</span>',
							id: 'strawberry',
						},
						{
							html: 'Watermelon<span class="sp-menu-item--meta">(3)</span>',
							id: 'watermelon',
						},
						{
							label: 'Apple',
							id: 'apple',
							submenu: [
								{
									html: 'Pink Lady <span class="sp-menu-item--meta">(15)</span>',
									id: 'pink-lady',
								},
								{
									html: 'Empire <span class="sp-menu-item--meta">(23)</span>',
									id: 'empire',
								},
								{
									html: 'Fuji <span class="sp-menu-item--meta">(65)</span>',
									id: 'fuji',
								},
								{
									html: 'Gala <span class="sp-menu-item--meta">(33)</span>',
									id: 'gala',
								},
								{
									html: 'Golden Delicious <span class="sp-menu-item--meta">(8)</span>',
									id: 'golden-delicious',
									selected: true,
								},
								{
									html: 'Granny Smith <span class="sp-menu-item--meta">(80)</span>',
									id: 'granny-smith',
								},
								{
									html: 'Honeycrisp <span class="sp-menu-item--meta">(102)</span>',
									id: 'honeycrisp',
								},
								{
									html: 'McIntosh <span class="sp-menu-item--meta">(64)</span>',
									id: 'mcintosh',
								},
							],
						},
						{
							html: 'Peach<span class="sp-menu-item--meta">(18)</span>',
							id: 'peach',
						},
						{
							label: 'Banana',
							id: 'banana',
							submenu: [
								{
									html: 'Cavendish Banana<span class="sp-menu-item--meta">(23)</span>',
									id: 'cavendish-banana',
								},
								{
									html: 'Pisang Raja<span class="sp-menu-item--meta">(8)</span>',
									id: 'pisang-raja',
								},
								{
									html: 'Red Banana<span class="sp-menu-item--meta">(12)</span>',
									id: 'red-banana',
								},
								{
									html: 'Lady Finger Banana<span class="sp-menu-item--meta">(16)</span>',
									id: 'Lady finger-banana',
								},
								{
									html: 'Blue Java Banana<span class="sp-menu-item--meta">(5)</span>',
									id: 'Blue java-banana',
								},
								{
									html: 'Plantain<span class="sp-menu-item--meta">(23)</span>',
									id: 'plantain',
								},
								{
									html: 'Manzano Banana<span class="sp-menu-item--meta">(9)</span>',
									id: 'manzano-banana',
								},
								{
									html: 'Burro Banana<span class="sp-menu-item--meta">(31)</span>',
									id: 'burro-banana',
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
