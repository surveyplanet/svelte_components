<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';
	import { BUTTON_MODES } from './_definitions';

	export let title: string;
	export let subtitle: string;
	export let confirm: true;
	// export let type: string = 'info';
	//hide delay is the time in milliseconds that the alert will be visible before it is hidden
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

	const challengeHandler = (event: CustomEvent) => {
		let input = event.detail.target;

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
		addClass('sp-alert--hidden');
		const animated = document.querySelector('.sp-alert--hidden');
		animated.addEventListener('animationend', () => {
			dispatchEvent('alertClosed');
		});
		dispatch('alertOut', event);
	};

	const alertConfirmHandler = (event: Event) => {
		dispatch('alertConfirm', event);
	};

	const alertNotConfirmedHandler = (event: Event) => {
		dispatch('alertNotConfirmed', event);
	};
</script>

<div
	class="sp-alert"
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
		<div class="sp-alert--challange--submit" />

		{#if disabledButton == true}
			<div class="sp-alert--confirm">
				<Button
					<Button
					on:click={alertCloseHandler}
					disabled={true}
					mode={BUTTON_MODES.PRIMARY}>Submit</Button>
			</div>
		{:else}
			<div class="sp-alert--confirm">
				<Button
					on:click={alertCloseHandler}
					mode={BUTTON_MODES.PRIMARY}>Submit</Button>
			</div>
		{/if}
	{/if}
	<button
		class="sp-alert--cancel"
		on:click{alertCloseHandler}>x</button>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-alert {
		border: 1px solid $color--slate-dark;
		border-radius: $size-radius--default;
		box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 1);
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

	.sp-alert--hidden {
		opacity: 0;
		pointer-events: none;
	}
</style>
