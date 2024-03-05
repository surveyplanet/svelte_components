<script lang="ts">
	import { Icon } from '$lib';

	interface ColorSelectorProps {
		value?: string;
	}
	let { value = '#000' } = $props<ColorSelectorProps>();
	let inputEl: HTMLInputElement | undefined = $state();

	const onClickHandler = (e: MouseEvent) => {
		e.stopPropagation();
		console.log('clicked', e.target);
		inputEl!.click();
	};
</script>

<button
	class="color-selector-wrapper"
	onclick={onClickHandler}>
	<input
		type="color"
		{value}
		class="color-selector"
		bind:this={inputEl} />
	<Icon
		color="#191F29"
		size={12}
		strokeWidth={3}
		name="chevronDown" />
</button>

<style lang="scss">
	@use '@surveyplanet/styles/src/colors.scss' as *;
	@use '@surveyplanet/styles/src/sizes.scss' as *;

	.color-selector-wrapper {
		display: inline-flex;
		gap: 4px;
		align-items: center;
		border: 1px solid $color--beige-darker;
		width: fit-content;
		padding: 5px 7px;
		border-radius: $size-radius--default;
		background-color: $color--white;
	}

	.color-selector {
		border: none;
		outline: none;
		box-shadow: none;
		background-color: transparent;
		width: 20px;
		height: 20px;
		padding: 0;
		margin: 0;
		flex-shrink: 0;
		border-radius: $size-radius--small;
		overflow: hidden;
		&::-webkit-color-swatch-wrapper {
			padding: 0;
		}
		&::-webkit-color-swatch {
			border: none;
		}
	}
</style>
