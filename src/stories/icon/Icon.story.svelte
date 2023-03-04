<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Icon, type IconName, type IconSize } from '../../lib';
	import { COLORS } from '../../lib/_definitions';
	import { default as source } from './source';
	import ICON_DATA from '../../lib/_icon_data';
	export let Hst: Histoire;

	let color = COLORS.slateDark;
	let size: IconSize = 24;
	let name: IconName = 'bell';
	let debug = false;
</script>

<Hst.Story title="Icon">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={name}
			title="Name"
			options={Object.keys(ICON_DATA).map((key) => {
				return {
					label: key.charAt(0).toUpperCase() + key.slice(1),
					value: key,
				};
			})} />
		<Hst.Select
			bind:value={color}
			title="Color"
			options={Object.keys(COLORS).map((key) => {
				const colorName = (
					key.charAt(0).toUpperCase() + key.slice(1)
				).replace(/_/g, ' ');
				return {
					label: colorName,
					value: COLORS[key],
				};
			})} />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={[8, 16, 20, 24, 32, 48, 64, 128, 256, 512]} />

		<Hst.Checkbox
			bind:value={debug}
			title="Debug" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Icon
			{name}
			{size}
			{color}
			{debug} />
	</Hst.Variant>
</Hst.Story>
