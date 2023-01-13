<script lang="ts">
	export let bgColor: string | null;
	export let textColor: string | null;
</script>

<span
	class="sp-badge"
	style:background-color={bgColor}
	style:color={textColor}>
	<slot />
</span>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-badge {
		display: inline-flex;
		height: $size--14;
		padding: 0 $size--4;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: $size-radius--large;
		color: $color--slate-dark;
		font: $font--xsmall-bold;
		line-height: $size--14;
		font-size: $size--8;
		text-transform: uppercase;
		background-color: $color--yellow;
	}

	:global(.sp-icon) {
		width: 12px;
		height: 12px;
	}
</style>
