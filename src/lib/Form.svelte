<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	export let id: string = (Date.now() + Math.random()).toString(36);

	let form: HTMLFormElement;

	let submitButton: HTMLButtonElement;

	const submitEventHandler = () => {
		const formData = new FormData(form);

		let formOutput = {};
		for (const [key, value] of formData) {
			formOutput = {
				...formOutput,
				[key]: value,
			};
		}
		dispatch('submit', formOutput);
	};
	onMount(() => {
		submitButton = form.getElementsByTagName('button')[0];

		if (submitButton) {
			submitButton.addEventListener('click', submitEventHandler);
		}
	});

	onDestroy(() => {
		if (submitButton) {
			submitButton.removeEventListener('click', submitEventHandler);
		}
	});
</script>

<div>
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<form
		bind:this={form}
		class="sp-form"
		test-id="form"
		aria-label="form"
		{id}>
		<slot />
	</form>
</div>
