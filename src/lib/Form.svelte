<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	export let id: string = (Date.now() + Math.random()).toString(36);

	let form: HTMLFormElement;

	let submitButton: HTMLButtonElement;

	const submitEventHandler = () => {
		let formObject = {};
		let formControls = document.querySelectorAll(
			'input',
			'select',
			'textarea'
		) as NodeListOf<HTMLInputElement>;
		formControls.forEach((control) => {
			formObject[control.name || control.id] = control.value;
		});
		console.log(formObject);
		dispatch('submit', formObject);
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

<form
	bind:this={form}
	class="sp-form"
	{id}>
	<slot />
</form>
