<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tick } from 'svelte';
	import { BUTTON_MODES, Button, Icon, TextInput } from './';

	const dispatch = createEventDispatcher();

	export let title: string | null;
	export let subtitle: string | null;
	export let type: 'info' | 'warning' | 'error' | 'success' = 'success';
	export let hideDelay = 0;

	export let confirm = false;
	export let confirmButtonLabel = 'Confirm';
	export let cancelButtonLabel = 'Close';
	export let challengeLabel: string | null = null;
	export let challenge: string | null = null;

	let visible = true;
	let enableConfirmButton = false;

	// handlers
	const challengeKeyupHandler = (event: SvelteCustomEvent): void => {
		const input = event.detail.target as HTMLInputElement;
		enableConfirmButton = input.value !== challenge;
		if (enableConfirmButton) {
			dispatch('alertChallenge', input.value);
		}
	};

	const destroy = () => {
		dispatch('alertClose');
		visible = false;
	};

	const alertConfirmHandler = () => {
		dispatch('alertConfirm');
		destroy();
	};

	const closeButtonClickHandler = () => {
		dispatch('alertNotConfirm');
		destroy();
	};

	const transitionendHandler = () => {
		if (!visible) {
			console.log('alertOut');
			dispatch('alertOut');
		} else {
			console.log('alertIn');
			dispatch('alertIn');
		}
	};

	(async function () {
		await tick();
		dispatch('alertOpen');
		try {
			if (!confirm && hideDelay > 0) {
				setTimeout(() => {
					visible = false;
				}, hideDelay);
			}
		} catch (e) {
			console.error(e);
		}
	})();
</script>

<div
	on:transitionend={transitionendHandler}
	class="sp-alert sp-alert--{type}"
	role="alert"
	class:sp-alert--visible={visible}
	class:sp-alert--confirm={confirm}
	class:sp-alert--challenge={challenge?.length}>
	<div class="sp-alert--header">
		{#if !confirm}
			<button
				on:click={closeButtonClickHandler}
				class="sp-alert--header--close-btn">
				<Icon name="close" />
			</button>
		{/if}

		{#if title?.length}
			<h3 class="sp-alert--header--title">{title}</h3>
		{/if}

		{#if subtitle?.length}
			<h4 class="sp-alert--header--subtitle">{subtitle}</h4>
		{/if}
	</div>

	<div class="sp-alert--body">
		<slot />
	</div>

	{#if confirm}
		<footer class="sp-alert--footer">
			{#if challenge?.length}
				<div class="sp-alert--challenge">
					<TextInput
						label={challengeLabel}
						placeholder={challenge}
						on:keyup={challengeKeyupHandler} />
				</div>
			{/if}
			<nav>
				<ul>
					<li class="sp-alert--confirm">
						<Button
							disabled={enableConfirmButton}
							on:click={alertConfirmHandler}
							mode={BUTTON_MODES.PRIMARY}>
							{confirmButtonLabel}
						</Button>
					</li>
					<li class="sp-alert--close">
						<Button
							on:click={closeButtonClickHandler}
							mode={BUTTON_MODES.SECONDARY}>
							{cancelButtonLabel}
						</Button>
					</li>
				</ul>
			</nav>
		</footer>
	{/if}
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	$animation-speed: 300ms;

	.sp-alert {
		border: 1px solid $color--slate-dark;
		border-radius: $size-radius--default;
		box-shadow: 1px 1px 3px 0px $color--slate-dark;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: $size--256;
		max-width: $size--256;
		padding: $size--16;
		position: relative;
		z-index: 1000;
		font: $font--default;
		opacity: 0;
		visibility: hidden;
		transition: opacity $animation-speed ease-in-out,
			visibility $animation-speed ease-in-out;

		&.sp-alert--visible {
			opacity: 1;
			visibility: visible;
		}

		&.sp-alert--info {
			background: $color--green-light;
			color: $color--slate-dark;
		}

		&.sp-alert--warning {
			background: $color--yellow-light;
			color: $color--slate-dark;
		}

		&.sp-alert--error {
			background: $color--pink-dark;
			color: $color--slate-dark;
		}

		&.sp-alert--success {
			background: $color--green-light;
			color: $color--slate-dark;
		}

		&.sp-alert--challenge {
			background: $color--purple;
			color: $color--slate-dark;
		}
	}

	.sp-alert--header {
		display: flex;
		flex-direction: column;
	}

	.sp-alert--footer {
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}
	}

	.sp-alert--challenge {
		margin-top: $size--16;
		margin-bottom: $size--16;
	}
	.sp-alert--cancel {
		background: none;
		border: 1px solid $color--slate-dark;
		border-radius: $size-radius--default;
		color: $color--slate-dark;
		cursor: pointer;
		font-size: $size--24;
		font-weight: bold;
		position: absolute;
		right: $size--8;
		top: $size--8;
		box-shadow: 1px 1px 3px 0px $color--slate-dark;
	}
	.sp-alert--cancel:active {
		transform: translate(1px, 1px);
		box-shadow: 1px 1px 1px 0px $color--slate-dark;
	}
</style>
