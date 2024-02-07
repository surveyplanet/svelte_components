<script
	lang="ts"
	context="module">
	export type AlertProps = {
		title: string | null;
		subtitle: string | null;
		type: 'info' | 'warning' | 'error' | 'success';
		hideDelay?: number;
		confirm?: boolean;
		confirmButtonLabel?: string;
		cancelButtonLabel?: string;
		challenge?: string;
		challengeLabel?: string;
		animationMilliseconds?: number;
		onConfirm?: () => void;
		onOpen?: () => void;
		onIn?: () => void;
		onClose?: () => void;
		onOut?: () => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { COLORS, BUTTON_MODES, Button, Icon, TextInput } from './';
	// import '../assets/styles/alert.scss';
	import successIcon from '../assets/mascots/tummi_3.svg';
	import infoIcon from '../assets/mascots/cubbi_3.svg';
	import warningIcon from '../assets/mascots/zummi_3.svg';
	import errorIcon from '../assets/mascots/sunni_3.svg';

	let {
		title,
		subtitle,
		type,
		hideDelay, // in milliseconds
		confirm = false,
		confirmButtonLabel = 'Confirm',
		cancelButtonLabel = 'Cancel',
		challenge = '', // challenge string to confirm action
		challengeLabel = '',
		animationMilliseconds = 350,
		onConfirm,
		onOpen,
		onIn,
		onClose,
		onOut,
		children,
	} = $props<AlertProps>();

	let visible = $state(false);
	let icon = $state(successIcon);
	let isChallenge = $derived(confirm && challenge.length > 0);
	let disableConfirmButton: boolean = $state(false);
	$effect(() => {
		if (!confirm && hideDelay && hideDelay > 0) {
			setTimeout(() => {
				visible = false;
			}, hideDelay);
		}

		if (isChallenge) {
			disableConfirmButton = true;
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
	});

	$effect(() => {
		visible = true;
	});

	const challengeKeyupHandler = (event: Event): void => {
		const input = (event as CustomEvent).detail.target as HTMLInputElement;
		disableConfirmButton = input.value !== challenge;
	};

	const closeButtonClickHandler = () => {
		visible = false;
	};
	const alertConfirmButtonClickHandler = () => {
		const value = isChallenge ? !disableConfirmButton : true;
		if (value) visible = false;
		if (onConfirm) onConfirm();
	};
</script>

<!-- TODO: 'sp-alert--confirm' class is used in the nav and in the base component -->

<!-- TODO: Challenge is not showing -->
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
		onIntroStart={onOpen}
		onIntroEnd={onIn}
		onOutroStart={onClose}
		onOutroEnd={onOut}>
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
						onclick={closeButtonClickHandler}
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
				{#if children}
					{@render children()}
				{/if}
			</div>

			{#if confirm}
				<footer class="sp-alert--footer">
					{#if isChallenge}
						<div class="sp-alert--challenge">
							<TextInput
								id={`challenge-${(Date.now() + Math.random()).toString(36)}`}
								name="challenge"
								label={challengeLabel}
								placeholder={challenge}
								onKeyup={challengeKeyupHandler} />
						</div>
					{/if}
					<menu>
						<li class="sp-alert--confirm-btn">
							<Button
								disabled={disableConfirmButton}
								onClick={alertConfirmButtonClickHandler}
								mode={BUTTON_MODES.primary}>
								{confirmButtonLabel}
							</Button>
						</li>
						<li class="sp-alert--close-btn">
							<Button
								onClick={closeButtonClickHandler}
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
