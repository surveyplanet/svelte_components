<script lang="ts">
	export let label: string = 'Pro';

	enum COLORS {
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TERTIARY = 'tertiary',
		SUCCESS = 'success',
		WARNING = 'warning',
		DANGER = 'danger',
		INFO = 'info',
		LIGHT = 'light',
		DARK = 'dark',
	}

	enum SIZES {
		SMALL = 'small',
		MEDIUM = 'medium',
		LARGE = 'large',
	}

	export let color: COLORS = COLORS.PRIMARY;

	export let size: SIZES = SIZES.MEDIUM;
</script>

<div>
	<span class="sp-badge sp-badge--{color} sp-badge--{size}">{label}</span>
</div>

<style lang="scss">
	.sp-badge {
		display: inline-block;
		padding: 0.25em 0.4em;
		font-size: 75%;
		font-weight: 700;
		line-height: 1;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 0.25rem;
	}
	.sp-badge {
		background-color: #ffe978;
	}

	.sp-badge--text {
		color: black;
	}

	.sp-badge--primary {
		background-color: #ffe978;
	}

	.sp-badge--secondary {
		background-color: #a185e7;
	}

	.sp-badge--tertiary {
		background-color: #a1fda5;
	}

	.sp-badge--success {
		background-color: #a1fda5;
	}

	.sp-badge--warning {
		background-color: #ffe978;
	}

	.sp-badge--danger {
		background-color: #ff8a8a;
	}

	.sp-badge--info {
		background-color: #a185e7;
	}

	.sp-badge--light {
		background-color: #f5f5f5;
	}

	.sp-badge--dark {
		background-color: #a1fda5;
	}

	.sp-badge--small {
		padding: 0.25em 0.4em;
		font-size: 75%;
		line-height: 1;
		border-radius: 0.25rem;
	}

	.sp-badge--medium {
		padding: 0.4em 0.6em;
		font-size: 100%;
		line-height: 1.25;
		border-radius: 0.25rem;
	}

	.sp-badge--large {
		padding: 0.5em 0.8em;
		font-size: 125%;
		line-height: 1.25;
		border-radius: 0.25rem;
	}
</style>
