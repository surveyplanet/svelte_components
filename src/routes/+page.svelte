<script lang="ts">
	import Layout from '$layout/Layout.svelte';
	import md from './docs.md?raw';
</script>

{#snippet main()}
	<h1>Please select a component from the dropdown menu on the left</h1>
{/snippet}

{#snippet controls()}
	<p>Controls will be displayed on a component route</p>
{/snippet}

<Layout
	example={'Example will show once you choose a component from the sidebar'}
	{main}
	{controls}
	component="Please choose your component"
	{md}>
</Layout>
