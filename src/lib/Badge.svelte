<script lang="ts">
	export let color: 'yellow' | 'blue' | 'pink' | 'green' = 'yellow';
	export let flat = false;
</script>

<span
	class="sp-badge sp-badge--{color}"
	class:sp-badge--flat={flat}>
	<slot />
</span>
