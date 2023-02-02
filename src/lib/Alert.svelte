<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
	import { BUTTON_MODES } from './_definitions';

	export let title: string;
	export let subtitle: string;
	export let confirm: true;
	export let type = 'info' | 'warning' | 'error' | 'success' | 'challenge';
	export let hideDelay: number;
	export let challenge: string;
	export let challengeLabel: string;

	let visible = true;

	if (hideDelay > 0) {
		setTimeout(() => {
			visible = false;
		}, hideDelay);
	}

	let disabledButton = true;
	let alert: HTMLDivElement;
	const challengeHandler = <
		T extends { detail: { target: HTMLInputElement } }
	>(
		event: T
	): void => {
		const input = event.detail.target;
		if (input.value === challenge) {
			disabledButton = false;
		} else {
			disabledButton = true;
		}
	};
	const dispatch = createEventDispatcher();

	const alertOpenHandler = (event: Event) => {
		dispatch('alertOpen', event);
	};

	const alertInHandler = (event: Event) => {
		dispatch('alertIn', event);
	};

	const alertOutHandler = (event: Event) => {
		console.log('alertOutHandler');
		alert.classList.add('sp-alert--hidden');
		alert.addEventListener('animationend', () => {
			console.log('animationend');
			dispatchEvent('alertClosed');
		});
		dispatch('alertOut', event);
	};

	const alertConfirmHandler = (event: Event) => {
		console.log('alertConfirmHandler');
		dispatch('alertConfirm', event);
	};

	const alertNotConfirmedHandler = (event: Event) => {
		dispatch('alertNotConfirmed', event);
	};
</script>

<div
	bind:this={alert}
	class="sp-alert sp-alert--{type}"
	class:sp-alert--hidden={!visible}>
	<div class="sp-alert--header">
		{#if title?.length > 0}
			<div class="sp-alert--header--title">{title}</div>
		{/if}
		{#if subtitle?.length > 0}
			<div class="sp-alert--header--subtitle">{subtitle}</div>
		{/if}
	</div>
	<div class="sp-alert--body">
		<slot />
	</div>
	{#if confirm}
		<div class="sp-alert--confirm">
			<Button
				on:click={alertOutHandler}
				on:click={alertConfirmHandler}
				mode={BUTTON_MODES.PRIMARY}>Confirm</Button>
		</div>
	{/if}
	{#if challenge}
		<div class="sp-alert--challenge">
			<TextInput
				label={challengeLabel}
				placeholder={challenge}
				on:keyup={challengeHandler} />
		</div>

		<div class="sp-alert--confirm">
			<Button
				on:click={alertOutHandler}
				disabled={disabledButton}
				mode={BUTTON_MODES.TERTIARY}>Submit</Button>
		</div>
	{/if}
	<button
		class="sp-alert--cancel"
		on:click={alertOutHandler}>X</button>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

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
		transition: all 0.3s ease-in-out;
		z-index: 1000;
		font: $font--default;

		&.sp-alert--hidden {
			opacity: 0;
			pointer-events: none;
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

	.sp-alert--header--title {
		font-size: $size--24;
		margin-bottom: $size--16;
	}

	.sp-alert--header--subtitle {
		font-size: $size--16;
		margin-bottom: $size--8;
	}

	.sp-alert--body {
		font-size: $size--16;

		margin-top: $size--16;
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

	.sp-alert--confirm {
		display: flex;
		justify-content: flex-end;
	}
</style>
