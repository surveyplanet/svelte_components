<script lang="ts">
	export let color: 'yellow' | 'blue' | 'pink' | 'green' = 'yellow';
	export let flat = false;
</script>

<span
	class="sp-badge sp-badge--{color}"
	class:sp-badge--flat={flat}>
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
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		border-radius: $size-radius--large;
		color: $color--darkest;
		font: $font--xsmall-bold;
		line-height: $size--14;
		font-size: $size--8;
		text-transform: uppercase;
		background-color: $color--yellow;
		overflow: hidden;
		text-overflow: ellipsis;

		:global(.sp-icon) {
			width: 12px;
			height: 12px;
		}
	}

	.sp-badge--yellow {
		background: $color--gradient--yellow;
		&.sp-badge--flat {
			background: $color--yellow;
		}
	}
	.sp-badge--blue {
		background: $color--gradient--blue;
		&.sp-badge--flat {
			background: $color--blue;
		}
	}
	.sp-badge--green {
		background: $color--gradient--green;
		&.sp-badge--flat {
			background: $color--green;
		}
	}
	.sp-badge--pink {
		background: $color--gradient--pink;
		&.sp-badge--flat {
			background: $color--pink;
		}
	}
</style>
