<script lang="ts">
	import { Icon, Badge } from '../../lib';
	import { COLORS, SIZES } from '../../lib/_definitions';
	import { default as source } from './source';
	import ICON_DATA from '../../lib/_icon_data';
	export let Hst;

	let color: string = COLORS.slate_dark;
	let size: string = SIZES.MEDIUM;
	let name = 'plus';
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
			options={Object.values(SIZES)} />
		<Hst.Checkbox
			bind:value={debug}
			title="Debug" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Icon
			{name}
			{color}
			{debug} />
	</Hst.Variant>
</Hst.Story>
