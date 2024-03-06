import { COLORS } from '$lib';
import type { MenuData } from '$lib';

export const menuData: MenuData[] = [
	{ label: 'Edit', id: 'edit' },
	{ label: 'Preview', id: 'preview', icon: 'image' },
	{ label: 'Duplicate', id: 'duplicate', icon: 'copy', prependIcon: true },
	{
		label: 'Categories',
		id: 'categories',
		icon: 'edit',
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
								id: 'caspian-tiger',
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
				html: `<span class="color-chip" style="background: linear-gradient( 180deg, ${COLORS.yellowGradientStart} 0%, ${COLORS.yellowGradientEnd} 100% );"></span>`,
				id: 'yellow',
				inline: true,
			},
			{
				html: `<span class="color-chip" style="background: linear-gradient( 180deg, ${COLORS.blueGradientStart} 0%, ${COLORS.blueGradientEnd} 100% );"></span>`,
				id: 'blue',
				inline: true,
			},
			{
				html: `<span class="color-chip" style="background: linear-gradient( 180deg, ${COLORS.pinkGradientStart} 0%, ${COLORS.pinkGradientEnd} 100% );"></span>`,
				id: 'pink',
				inline: true,
			},
			{
				html: `<span class="color-chip" style="background: linear-gradient( 180deg, ${COLORS.greenGradientStart} 0%, ${COLORS.greenGradientEnd} 100% );"></span>`,
				id: 'green',
				inline: true,
				selected: false,
			},
		],
	},
	{ label: 'Delete', id: 'delete', meta: '⌘ D', divide: true },
];
