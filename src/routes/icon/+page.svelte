<script lang="ts">
	import { Icon, type IconProps } from '$lib';
	import { COLORS } from '$lib/_definitions';
	import ICON_DATA from '$lib/_icon_data';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	const iconNames = Object.keys(ICON_DATA) as IconProps['name'][];

	let color: IconProps['color'] = $state(COLORS.dark);
	let size: IconProps['size'] = $state(24);
	let name: IconProps['name'] = $state('bell');
	let debug: IconProps['debug'] = $state(false);

	let colorNames: keyof typeof COLORS = $state('dark');

	$effect(() => {
		color = COLORS[colorNames];
	});
</script>

<Layout
	component="Icon"
	example={source({ color, size, name })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Color"
			selectOptions={Object.keys(COLORS)}
			bind:value={colorNames} />
		<PropsChanger
			label="Size"
			selectOptions={[8, 12, 16, 20, 24, 32, 48, 64, 128, 256, 512]}
			bind:value={size} />
		<PropsChanger
			label="Name"
			selectOptions={iconNames}
			bind:value={name} />
		<PropsChanger
			label="Debug"
			bind:value={debug} />
	{/snippet}
	{#snippet main()}
		<div id="icon-preview">
			<Icon
				{color}
				{size}
				{name}
				{debug} />
		</div>

		<ul id="icon-list">
			{#each iconNames as iconName}
				<li class="icon-list--item">
					<Icon
						{color}
						{size}
						name={iconName} />
					<span class="icon-list--item--name">{iconName}</span>
				</li>
			{/each}
		</ul>
	{/snippet}
</Layout>

<style lang="scss">
	@use '@surveyplanet/styles/src/sizes.scss' as *;
	@use '@surveyplanet/styles/src/colors.scss' as *;
	@use '@surveyplanet/styles/src/effects.scss' as *;

	#icon-preview {
		border-radius: $size-radius--default;
		border: 1px solid $color--beige-darker;
		box-shadow: $shadow--light;
		display: inline-block;
		line-height: 0;
		margin: 0 auto;
		padding: $size-space--xl;
	}

	#icon-list {
		border-top: 1px solid $color--beige-darker;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: $size-space--m;
		list-style: none;
		margin: $size-space--xl 0 0 0;
		padding: $size-space--xl 0 0 0;
		.icon-list--item {
			align-items: center;
			display: inline-flex;
			flex-direction: column;
			width: 100px;
			// background-color: $color--pink;
			.icon-list--item--name {
				padding-top: $size-space--s;
			}
		}
	}
</style>
