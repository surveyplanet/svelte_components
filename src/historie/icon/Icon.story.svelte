<script lang="ts">
	import { Icon, Badge } from '../../lib';
	import { COLORS, SIZES } from '../../lib/_definitions';
	// import ICON_DATA from '../../lib/_icon_data';
	export let Hst;

	// let color: string = COLORS.light_purple_light;
	// let size: string = SIZES.MEDIUM;
	let name = 'add';
	let debug = false;

	// const source = `<Icon {bgColor} {textColor}>{content}</Icon>`;
</script>

<Hst.Story title="Icon">
	<!-- <svelte:fragment slot="controls">
		<Hst.Select
			bind:value={name}
			title="Name"
			options={[]} />
		<Hst.Select
			bind:value={color}
			title="Color"
			options={COLORS} />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={Object.values(SIZES)} />
		<Hst.Checkbox
			bind:checked={debug}
			title="Debug" />
	</svelte:fragment> -->

	<Hst.Variant title="Primary">
		<Icon {name} />
	</Hst.Variant>
</Hst.Story>
