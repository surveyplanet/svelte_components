<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Menu, Button } from '../../lib';
	import { logEvent } from 'histoire/client';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let items = [
		{
			name: 'Oranges',
			icon: 'menu',
			id: 'oranges',
			expanded: true,
			items: [
				{
					name: 'orange Juice',
					icon: 'calendar',
					id: 'oranges 1',
				},
				{ name: 'orange pie', icon: 'calendar', id: 'oranges 2' },
			],
		},
		{
			name: 'Pears',
			icon: 'menu',
			id: 'pears',
			expanded: true,
			items: [
				{
					name: 'Pie',
					icon: 'menu',
					id: 'pears 1',
					expanded: false,

					items: [
						{
							name: 'treadmill.gif',
							icon: 'calendar',
							id: 'pears 11',
						},
						{
							name: 'rope-jumping.gif',
							icon: 'calendar',
							id: 'pears 12',
						},
					],
				},
				{
					name: 'Goats',
					icon: 'menu',
					id: 'pears 2',
					expanded: false,

					items: [
						{
							name: 'parkour.gif',
							icon: 'calendar',
							id: 'pears 21',
						},
						{
							name: 'rampage.gif',
							icon: 'calendar 22',
							id: 'pears',
						},
					],
				},
				{
					name: 'cat-roomba.gif',
					icon: 'calendar',
					id: 'pears 3',
				},
				{
					name: 'duck-shuffle.gif',
					icon: 'calendar',
					id: 'pears 4',
				},
				{
					name: 'monkey-on-a-pig.gif',
					icon: 'calendar',
					id: 'pears 5',
				},
			],
		},
	];
</script>

<Hst.Story title="Menu">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={items}
			title="Menu Items" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<Menu {items} />
	</Hst.Variant>
</Hst.Story>
