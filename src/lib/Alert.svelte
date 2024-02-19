<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type AlertProps = HTMLAttributes<HTMLDivElement> & {
		visible?: boolean;
		title?: string;
		subtitle?: string;
		type?: 'info' | 'warning' | 'error' | 'success';
		hideDelay?: number;
		confirm?: boolean;
		confirmButtonLabel?: string;
		cancelButtonLabel?: string;
		challenge?: string;
		challengeLabel?: string;
		animationMilliseconds?: number;
		onAlertConfirm?: (event: ComponentEvent<undefined>) => void;
		onAlertOpen?: (event: CustomEvent) => void;
		onAlertIn?: (event: CustomEvent) => void;
		onAlertClose?: (event: CustomEvent) => void;
		onAlertOut?: (event: CustomEvent) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { COLORS, Button, Icon, TextInput, ComponentEvent } from './';

	const successIcon =
		'https://public.surveyplanet.com/images/mascots/tummi_3.svg' as const;
	const infoIcon =
		'https://public.surveyplanet.com/images/mascots/cubbi_3.svg' as const;
	const warningIcon =
		'https://public.surveyplanet.com/images/mascots/zummi_3.svg' as const;
	const errorIcon =
		'https://public.surveyplanet.com/images/mascots/sunni_3.svg' as const;

	let {
		visible,
		title,
		subtitle,
		type = 'success',
		hideDelay, // in milliseconds
		confirm,
		confirmButtonLabel = 'Confirm', // common label
		cancelButtonLabel = 'Cancel', // common label
		challenge, // challenge string to confirm action
		challengeLabel,
		animationMilliseconds = 350, // animation speed, commonly used
		onAlertConfirm,
		onAlertOpen,
		onAlertIn,
		onAlertClose,
		onAlertOut,
		children,
		...attr
	} = $props<AlertProps>();

	// let visible = $state(false);
	let icon: string = $derived.by(() => {
		switch (type) {
			case 'info':
				return infoIcon;
			case 'warning':
				return warningIcon;
			case 'error':
				return errorIcon;
			default:
				return successIcon;
		}
	});

	let isChallenge = $derived(confirm && challenge && challenge.length > 0);
	let disableConfirmButton: boolean = $state(false);

	$effect(() => {
		if (isChallenge) {
			disableConfirmButton = true;
		}

		if (!confirm && hideDelay && hideDelay > 0) {
			setTimeout(() => {
				visible = false;
			}, hideDelay);
		}
	});

	const challengeKeyupHandler = (event: ComponentEvent<string>): void => {
		const input = event.target as HTMLInputElement;
		disableConfirmButton = input.value !== challenge;
	};

	const closeButtonClickHandler = () => {
		visible = false;
	};
	const alertConfirmButtonClickHandler = (
		event: ComponentEvent<undefined>
	) => {
		const value = isChallenge ? !disableConfirmButton : true;
		if (value) visible = false;
		if (typeof onAlertConfirm === 'function') onAlertConfirm(event);
	};
</script>

<!-- TODO: 'sp-alert--confirm' class is used in the nav and in the base component -->

{#if visible}
	<div
		{...attr}
		role="alert"
		class="sp-alert sp-alert--{type}"
		class:sp-alert--confirm={confirm}
		class:sp-alert--challenge={isChallenge}
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		onIntroStart={onAlertOpen}
		onIntroEnd={onAlertIn}
		onOutroStart={onAlertClose}
		onOutroEnd={onAlertOut}>
		<div class="sp-alert--col-a">
			<div class="sp-alert--sidebar">
				{#if icon && icon.length}
					<img
						src={icon}
						alt={type} />
				{/if}
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
								name="challenge"
								label={challengeLabel}
								placeholder={challenge}
								onTextInputKeyup={challengeKeyupHandler} />
						</div>
					{/if}
					<menu>
						<li class="sp-alert--confirm-btn">
							<Button
								disabled={disableConfirmButton}
								onButtonClick={alertConfirmButtonClickHandler}
								mode={'primary'}>
								{confirmButtonLabel}
							</Button>
						</li>
						<li class="sp-alert--close-btn">
							<Button
								onButtonClick={closeButtonClickHandler}
								mode={'light'}>
								{cancelButtonLabel}
							</Button>
						</li>
					</menu>
				</footer>
			{/if}
		</div>
	</div>
{/if}
