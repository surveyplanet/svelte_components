<script lang="ts">
	import type { ComponentEvent } from '$lib';
	import CodeMirror from './code_mirror/CodeMirror.svelte';
	import { json } from '@codemirror/lang-json';

	let { value } = $props();

	let StringData = $state(JSON.stringify(value, null, 2));

	$effect(() => {
		StringData = JSON.stringify(value, null, 2);
	});
	// $inspect('JSON EDITOR STRING DATA', StringData);

	const onCodeMirrorChange = (event: ComponentEvent<string>) => {
		value = JSON.parse(event.value);
	};
</script>

<div class="jsonEditor">
	{#key StringData}
		<CodeMirror
			bind:value={StringData}
			lang={json()}
			{onCodeMirrorChange} />
	{/key}
</div>

<style lang="scss">
	@use '@surveyplanet/styles/src/colors.scss' as *;
	@use '@surveyplanet/styles/src/sizes.scss' as *;

	.jsonEditor {
		max-height: 407px; // first 20 lines
		overflow: auto;
		border: 1px solid $color--beige-darker;
		border-radius: $size-radius--small;
		background-color: $color--beige-dark;
	}

	:global(.cm-gutters) {
		background-color: $color--beige-darker !important;
		color: $color--beige-darkest !important;
	}

	:global(.cm-activeLineGutter) {
		background-color: $color--blue !important;
	}
	:global(.cm-activeLine) {
		background-color: hsl(195.48deg 93.94% 87.06% / 50%) !important;
	}
</style>
