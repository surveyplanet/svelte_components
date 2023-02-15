<script lang="ts">
	export let id: string = (Date.now() + Math.random()).toString(36);
	export let trigger = '';

	const submitEventHandler = (event: Event) => {
		console.log('submitEventHandler');
	};
</script>

<form
	class="sp-form"
	{id}>
	<slot />
</form>
