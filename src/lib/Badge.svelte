<script lang="ts">
	export let label: string = '';
	export let color: string | null;
	export let labelColor: string | null;
</script>

<span
	class="sp-badge"
	style:background-color={color && color.length ? color : undefined}
	style:color={labelColor && labelColor.length ? labelColor : undefined}>
	{label}
</span>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-badge {
		display: inline;
		height: $size--14;
		padding: 0 $size--4;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: $size-radius--large;
		color: $color--darkest;
		font: $font--xsmall-bold;
		line-height: $size--14;
		font-size: $size--8;
		text-transform: uppercase;
		background-color: $color--yellow;
	}
</style>
