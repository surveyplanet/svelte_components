<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let subtitle: string;
	export let body: string;
	//htmlString will pass in a string of html to be rendered inside of the body ins
	export let htmlString: string;
	export let type: string = 'info';
	//hide delay is the time in milliseconds that the alert will be visible before it is hidden
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

<div class="sp-alert">
	{#if title}
		<h1 class="sp-alert--title">{title}</h1>
	{/if}

	{#if subtitle}
		<h2 class="sp-alert--subtitle">{subtitle}</h2>
	{/if}

	{#if body}
		<p class="sp-alert--body">{body}</p>
	{/if}

	{#if htmlString}
		<div
			class="sp-alert--body"
			innerHTML={htmlString} />
	{/if}

	{#if confirm}
		<div class="sp-alert--confirm">
			<button
				class="sp-alert--confirm--button"
				on:click={alertConfirmHandler}>
				{confirmButtonLabel}
			</button>
			<button
				class="sp-alert--confirm--button"
				on:click={alertNotConfirmedHandler}>
				{cancelButtonLabel}
			</button>
		</div>
	{/if}

	{#if challenge}
		<div class="sp-alert--challenge">
			<input
				class="sp-alert--challenge--input"
				type="text"
				bind:value={challenge} />
			<button
				class="sp-alert--challenge--button"
				on:click={alertConfirmHandler}>
				{confirmButtonLabel}
			</button>
			<button
				class="sp-alert--challenge--button"
				on:click={alertNotConfirmedHandler}>
				{cancelButtonLabel}
			</button>
		</div>
	{/if}
</div>

<style lang="scss">
</style>
