<script lang="ts">
	import Layout from '$layout/Layout.svelte';
	import { default as source } from './example';
	import md from './docs.md?raw';
</script>

<Layout
	example={source()}
	component="Please choose your component"
	{md}>
	{#snippet main()}
		<h1>Please select a component from the dropdown menu on the left</h1>
	{/snippet}
	{#snippet controls()}
		<p>Controls will be displayed on a component route</p>
	{/snippet}
</Layout>
