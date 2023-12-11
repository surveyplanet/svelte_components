<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { COLORS, BUTTON_MODES, Button, Icon, TextInput } from './';

	// import '../assets/styles/alert.scss';
	import successIcon from '../assets/mascots/tummi_3.svg';
	import infoIcon from '../assets/mascots/cubbi_3.svg';
	import warningIcon from '../assets/mascots/zummi_3.svg';
	import errorIcon from '../assets/mascots/sunni_3.svg';

	const dispatch = createEventDispatcher();
	const dispatchConfirm = createEventDispatcher<{ confirm: boolean }>();

	/**
	 * Main alert title.
	 */
	export let title: string | null;

	/**
	 * Optional alert subtitle.
	 */
	export let subtitle: string | null;

	/**
	 * The type of alert.
	 */
	export let type: 'info' | 'warning' | 'error' | 'success' = 'success';

	/**
	 * Automatically hide alert after X milliseconds. A value of 0 means don't hide.
	 */
	export let hideDelay = 0;

	/**
	 * Whether the alert needs to be confirmed before it is closed.
	 */
	export let confirm = false;

	/**
	 * Text label for the confirm button.
	 */
	export let confirmButtonLabel = 'Confirm';

	/**
	 * Text label for the cancel confirm button.
	 */
	export let cancelButtonLabel = 'Cancel';

	/**
	 * If provided alert displays a text input which must be valid before confirm button can be clicked.
	 */
	export let challenge = '';

	/**
	 * The label for the challenge input
	 */
	export let challengeLabel = '';

	/**
	 * The total time in milliseconds for the alert to animate in or out.
	 */
	export let animationMilliseconds = 350;

	let visible = false;
	let icon = successIcon;
	$: isChallenge = confirm && challenge.length > 0;
	$: disableConfirmButton = isChallenge;
	$: {
		if (!confirm && hideDelay > 0) {
			setTimeout(() => {
				visible = false;
			}, hideDelay);
		}

		switch (type) {
			case 'info':
				icon = infoIcon;
				break;
			case 'warning':
				icon = warningIcon;
				break;
			case 'error':
				icon = errorIcon;
				break;
			default:
				icon = successIcon;
				break;
		}
	}

	// handlers
	onMount(() => {
		visible = true;
	});

	const challengeKeyupHandler = (event: Event): void => {
		const input = (event as CustomEvent).detail.target as HTMLInputElement;
		disableConfirmButton = input.value !== challenge;
	};

	const alertConfirmButtonClickHandler = () => {
		const value = isChallenge ? !disableConfirmButton : true;
		dispatchConfirm('confirm', value);
		visible = false;
	};

	const closeButtonClickHandler = () => {
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

<!-- TODO: 'sp-alert--confirm' class is used in the nav and in the base component -->
{#if visible}
	<div
		role="alert"
		class="sp-alert sp-alert--{type}"
		class:sp-alert--confirm={confirm}
		class:sp-alert--challenge={isChallenge}
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		on:introstart={introStartHandler}
		on:introend={introEndHandler}
		on:outrostart={outroStartHandler}
		on:outroend={outroEndHandler}>
		<div class="sp-alert--col-a">
			<div class="sp-alert--sidebar">
				<img
					src={icon}
					alt={type} />
			</div>
		</div>
		<div class="sp-alert--col-b">
			<header class="sp-alert--header">
				{#if !confirm}
					<button
						on:click={closeButtonClickHandler}
						class="sp-alert--header--close-btn">
						<Icon
							color={COLORS.dark}
							name="x"
							size={20} />
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
								id="defaultId"
								name="challenge"
								label={challengeLabel}
								placeholder={challenge}
								on:keyup={challengeKeyupHandler} />
						</div>
					{/if}
					<menu>
						<li class="sp-alert--confirm-btn">
							<Button
								disabled={disableConfirmButton}
								on:click={alertConfirmButtonClickHandler}
								mode={BUTTON_MODES.primary}>
								{confirmButtonLabel}
							</Button>
						</li>
						<li class="sp-alert--close-btn">
							<Button
								on:click={closeButtonClickHandler}
								mode={BUTTON_MODES.light}>
								{cancelButtonLabel}
							</Button>
						</li>
					</menu>
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	$animation-speed: 300ms;

	:global(.sp-alert) {
		background-color: $color--white;

		&.sp-alert--info {
			.sp-alert--sidebar {
				background: $color--gradient--blue;
			}
		}

		&.sp-alert--warning {
			.sp-alert--sidebar {
				background: $color--gradient--yellow;
			}
		}

		&.sp-alert--error {
			.sp-alert--sidebar {
				background: $color--gradient--pink;
			}
		}

		&.sp-alert--success {
			.sp-alert--sidebar {
				background: $color--gradient--green;
			}
		}
	}

	.sp-alert {
		position: relative;
		// position: absolute;
		z-index: 1000;
		min-width: $size--256;
		max-width: px-to-rem(375);
		margin: 0;
		padding: $size-gutter--eighth;
		border-radius: $size-radius--large;
		box-shadow: 0px 0px 25px 0px rgba(235, 231, 220, 0.8);
		font: $font--default;
		color: $color--beige-darkest;
		// overflow: hidden;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.sp-alert--col-a {
		flex-basis: $size--64;
	}
	.sp-alert--col-b {
		flex-grow: 1;
		// background-color: red;
		padding: $size-gutter--half;
	}

	.sp-alert--sidebar {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: $size-radius--default;
		img {
			max-width: $size--56;
		}
	}

	.sp-alert--header {
		position: relative;

		.sp-alert--header--subtitle,
		.sp-alert--header--title {
			color: $color--dark;
			margin: 0;
			padding: 0;
		}
	}

	.sp-alert--header--close-btn {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
		width: $size--20;
		height: $size--20;
		line-height: $size--20;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
		border-radius: $size-radius--small;
		&:hover {
			background-color: $color--beige-darker;
			:global(.sp-icon path) {
				stroke: $color--white;
			}
		}
	}

	.sp-alert--body {
		padding-top: $size-gutter--half;
		&:empty {
			display: none;
		}
	}

	.sp-alert--footer {
		padding-top: $size-gutter--half;
		menu {
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
		margin-bottom: $size-gutter--half;
	}
</style>
