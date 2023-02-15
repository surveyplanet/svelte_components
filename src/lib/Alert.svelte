<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { fly, slide, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { BUTTON_MODES, Button, Icon, TextInput } from './';

	const dispatch = createEventDispatcher();

	export let title: string | null;
	export let subtitle: string | null;
	export let type: 'info' | 'warning' | 'error' | 'success' = 'success';
	export let hideDelay = 0;

	export let confirm = false;
	export let confirmButtonLabel = 'Confirm';
	export let cancelButtonLabel = 'Cancel';
	export let challenge: string | null = null;
	export let challengeLabel: string | null = null;

	let visible = false;
	let disableConfirmButton = false;
	let isChallenge = confirm && challenge?.length > 0;

	// handlers
	onMount(() => {
		visible = true;
		disableConfirmButton = isChallenge;
		if (!confirm && hideDelay > 0) {
			setTimeout(() => {
				visible = false;
			}, hideDelay);
		}
	});

	const challengeKeyupHandler = (event: SvelteCustomEvent): void => {
		const input = event.detail.target as HTMLInputElement;
		disableConfirmButton = input.value !== challenge;
	};

	const alertConfirmButtonClickHandler = () => {
		const value = isChallenge ? disableConfirmButton : true;
		dispatch('confirm', value);
		visible = false;
	};

	const closeButtonClickHandler = () => {
		dispatch('confirm', false);
		visible = false;
	};

	const introStartHandler = () => {
		dispatch('open');
	};

	const introEndHandler = () => {
		dispatch('in');
	};

	const outroStartHandler = () => {
		dispatch('close');
	};

	const outroEndHandler = () => {
		dispatch('out');
	};
</script>

{#if visible}
	<div
		role="alert"
		class="sp-alert sp-alert--{type}"
		class:sp-alert--confirm={confirm}
		class:sp-alert--challenge={isChallenge}
		transition:fly={{ y: -250, duration: 500, easing: cubicOut }}
		on:introstart={introStartHandler}
		on:introend={introEndHandler}
		on:outrostart={outroStartHandler}
		on:outroend={outroEndHandler}>
		<header class="sp-alert--header">
			{#if !confirm}
				<button
					on:click={closeButtonClickHandler}
					class="sp-alert--header--close-btn">
					<Icon
						name="close"
						size="32" />
				</button>
			{/if}

			{#if title?.length}
				<h3 class="sp-alert--header--title">{title}</h3>
			{/if}

			{#if subtitle?.length}
				<h4 class="sp-alert--header--subtitle">{subtitle}</h4>
			{/if}
		</header>

		<div class="sp-alert--body">
			<slot />
		</div>

		{#if confirm}
			<footer class="sp-alert--footer">
				{#if isChallenge}
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
								disabled={disableConfirmButton}
								on:click={alertConfirmButtonClickHandler}
								mode={BUTTON_MODES.DARK}>
								{confirmButtonLabel}
							</Button>
						</li>
						<li class="sp-alert--close">
							<Button
								on:click={closeButtonClickHandler}
								mode={BUTTON_MODES.LIGHT}>
								{cancelButtonLabel}
							</Button>
						</li>
					</ul>
				</nav>
			</footer>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	$animation-speed: 300ms;

	.sp-alert {
		z-index: 1000;
		min-width: $size--256;
		max-width: $size--256;
		padding: $size-gutter;
		position: relative;
		border: 1px solid $color--slate-dark;
		border-radius: $size-radius--default;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);
		font: $font--default;
		background-color: $color--white;

		&.sp-alert--info {
			// background-color: $color--blue;
			border-color: $color--blue-dark;
			color: $color--blue-dark;
		}

		&.sp-alert--warning {
			// background-color: $color--yellow;
			border-color: $color--yellow-dark;
			color: $color--yellow-dark;
		}

		&.sp-alert--error {
			// background-color: $color--pink;
			border-color: $color--pink-dark;
			color: $color--pink-dark;
		}

		&.sp-alert--success {
			// background-color: $color--green;
			border-color: $color--green-dark;
			color: $color--green-dark;
		}
	}

	.sp-alert--header {
		position: relative;
		.sp-alert--header--title {
			margin: 0;
			padding: 0;
		}
		.sp-alert--header--subtitle {
			margin: 0;
			padding: 0;
		}
	}

	.sp-alert--header--close-btn {
		position: absolute;
		right: -($size-gutter--half);
		top: -($size-gutter--half);
		cursor: pointer;
		width: $size--20;
		height: $size--20;
		line-height: $size--20;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
	}

	.sp-alert--body {
		padding-top: $size-gutter--half;
		&:empty {
			display: none;
		}
	}

	.sp-alert--footer {
		padding-top: $size-gutter--half;
		ul {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			gap: $size-gutter--half;
			list-style: none;
			margin: 0;
			padding: 0;
		}
	}

	.sp-alert--challenge {
		margin-top: $size--16;
		margin-bottom: $size--16;
	}
</style>
