<script lang="ts">
	import type { ComponentEvent } from '$lib';
	import CodeMirror from './code_mirror/CodeMirror.svelte';
	import { json } from '@codemirror/lang-json';
	import { solarizedDark } from 'cm6-theme-solarized-dark';
	import { solarizedLight } from 'cm6-theme-solarized-light';
	import { onDestroy } from 'svelte';

	let { value } = $props();

	let StringData = $state(JSON.stringify(value, null, 2));
	let isDarkMode = $state(false);
	let intervalId = $state();

	$effect(() => {
		StringData = JSON.stringify(value, null, 2);
		intervalId = setInterval(() => {
			isDarkMode = document.body.classList.contains('dark');
		}, 1);
	});
	onDestroy(() => {
		clearInterval(intervalId as number);
	});

	const onCodeMirrorChange = (event: ComponentEvent<string>) => {
		value = JSON.parse(event.value);
	};
</script>

<div class="jsonEditor">
	{#key StringData}
		<CodeMirror
			bind:value={StringData}
			lang={json()}
			theme={isDarkMode ? solarizedDark : solarizedLight}
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
