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
		box-sizing: border-box;
		display: inline-block;
		height: $size--14;
		max-width: 100%;
		padding: 0.5px $size--6;
		// padding: 0 $size--6;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		border-radius: $size-radius--large;
		color: $color--slate-dark;
		font: $font--xsmall-bold;
		line-height: $size--14;
		font-size: $size--8;
		text-transform: uppercase;
		background-color: $color--yellow;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.sp-icon) {
		width: 12px;
		height: 12px;
	}
</style>
