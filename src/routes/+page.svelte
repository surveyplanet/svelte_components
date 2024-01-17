<script lang="ts">
	import Layout from '$layout/Layout.svelte';
	import { default as source } from './example';
	import md from './docs.md?raw';
</script>

<Layout
	example={source()}
	component="Please choose your component"
	{md}>
	<svelte:fragment slot="main">
		<h1>Please select a component from the dropdown menu on the left</h1>
	</svelte:fragment>
</Layout>
