<script lang="ts">
	import Layout from '$layout/Layout.svelte';
	import { default as source } from './example';
	import md from './docs.md?raw';
</script>

<Layout example={source()} component="Please choose your component" {md}></Layout>
