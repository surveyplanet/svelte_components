<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let title: string;
	export let subtitle: string;
	export let body: string;
	export let html: string;
	export let type: string = 'info';
	export let hideDelay: number;
	export let confirm: boolean = false;
	export let confirmButtonLabel: string = 'Confirm';
	export let cancelButtonLabel: string = 'Cancel';
	export let challenge: string;

	const dispatch = createEventDispatcher();

	const alertOpenHandler = (event: Event) => {
		dispatch('alertOpen', event);
	};

	const alertInHandler = (event: Event) => {
		dispatch('alertIn', event);
	};

	const alertOutHandler = (event: Event) => {
		dispatch('alertOut', event);
	};

	const alertCloseHandler = (event: Event) => {
		dispatch('alertClose', event);
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
	class:sp-alert--info={type === 'info'}
	class:sp-alert--success={type === 'success'}
	class:sp-alert--warning={type === 'warning'}
	class:sp-alert--danger={type === 'danger'}
	class:sp-alert--confirm={confirm}>
	{#if title}
		<h4 class="sp-alert__title">{title}</h4>
	{/if}
	{#if subtitle}
		<h5 class="sp-alert__subtitle">{subtitle}</h5>
	{/if}
	{#if body}
		<p class="sp-alert__body">{body}</p>
	{/if}
	{#if confirm}
		<div class="sp-alert__confirm">
			<button
				class="sp-alert__confirm-button"
				type="button">{confirmButtonLabel}</button>
			<button
				class="sp-alert__cancel-button"
				type="button">{cancelButtonLabel}</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.sp-alert {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		padding: 1rem;
		box-sizing: border-box;
		text-align: center;
		opacity: 0;
		transform: translateY(-100%);
		transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
		pointer-events: none;
	}
</style>
