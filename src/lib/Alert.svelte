<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
	import { BUTTON_MODES } from './';

	const dispatch = createEventDispatcher();

	export let title: string;
	export let subtitle: string;
	export let type = 'info' | 'warning' | 'error' | 'success';
	export let hideDelay: number;

	export let confirm: true;
	export let confirmLabel: string | null = null;
	export let confirmCancelLabel: string = 'Cancel';

	export let challenge: string | null = null;
	export let challengeLabel: string | null = null;
	export let challengeCancelLabel: string = 'Cancel';

	let visible = false;

	// delay hiding the alert
	if (hideDelay > 0) {
		setTimeout(() => {
			visible = false;
			alertOutHandler();
		}, hideDelay);
	}

	// aria stuff
	let ariaLive = type === 'info' ? 'polite' : 'assertive';

	let disabledButton = true;

	let alert: HTMLDivElement;

	// handlers
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

	//  watch out for ghost events!
	// Where dom elements are invisible and still firing events.
	function destroy() {
		dispatch('alertClose');
		visible = false;
	}

	const alertOutHandler = (event: Event) => {
		destroy();
	};

	const alertConfirmHandler = (event: Event) => {
		dispatch('alertConfirm');
		destroy();
	};

	const closeButtonClickHandler = (event: Event) => {
		dispatch('alertNotConfirmed');
		destroy();
	};
</script>

<div
	class="sp-alert sp-alert--{type}"
	role="alert"
	class:sp-alert--hidden={!visible}
	class:sp-alert--confirm={confirm}
	class:sp-alert--challenge={challenge?.length}>
	<div class="sp-alert--header">
		<button
			class="sp-alert--cancel"
			aria-label={`Close ${type} alert`}
			on:click={closeButtonClickHandler}>X</button>

		{#if title?.length > 0}
			<h3 class="sp-alert--header--title">{title}</h3>
		{/if}

		{#if subtitle?.length > 0}
			<h4 class="sp-alert--header--subtitle">{subtitle}</h4>
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

	{#if challenge?.length}
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
		z-index: 1000;
		font: $font--default;
		transition: opacity 0.3s ease-in-out;

		&.sp-alert--hidden {
			opacity: 0;
			visibility: hidden;
			// pointer-events: none;
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

	// .sp-alert--header--title { }
	// .sp-alert--header--subtitle { }
	// .sp-alert--body { }

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
