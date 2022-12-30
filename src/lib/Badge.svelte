<script lang="ts">
	export let label: string = 'Pro';

	enum COLORS {
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TERTIARY = 'tertiary',
		SUCCESS = 'success',
		DANGER = 'danger',
	}

	export let color: COLORS = COLORS.PRIMARY;
</script>

<div>
	<span class="sp-badge sp-badge--{color}">{label}</span>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-badge {
		display: inline-block;
		height: 0.875rem;
		padding: 0.25em 0.4em;
		line-height: 1;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: $gutter--sixteenth;
		font-family: $font-family--default;
		// font: $font--xsmall-bold; this breaks the badge
	}

	.sp-badge {
		background-color: $color--yellow;
	}

	.sp-badge--text {
		color: $color--dark;
	}

	.sp-badge--primary {
		background-color: $color--yellow;
	}

	.sp-badge--secondary {
		background-color: $color--purple;
	}

	.sp-badge--tertiary {
		background-color: $color--green;
	}

	.sp-badge--danger {
		background-color: $color--pink-dark;
	}
</style>
