<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string | null = null;

	const submitHandler = (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
		let formOutput = {};
		for (const [key, value] of formData) {
			formOutput = {
				...formOutput,
				[key]: value,
			};
		}
		dispatch('submit', formOutput);
	};
</script>

<form
	on:submit|preventDefault={submitHandler}
	class="sp-form"
	{id}>
	<slot />
</form>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	form {
		& > :global(*) {
			margin: $size-gutter--half 0;
		}
	}
</style>
