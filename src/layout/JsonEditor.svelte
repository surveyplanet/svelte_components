<script lang="ts">
	import { ComponentEvent } from '$lib';
	import CodeMirror from './code_mirror/CodeMirror.svelte';
	import { json } from '@codemirror/lang-json';
	import { solarizedDark } from 'cm6-theme-solarized-dark';
	import { solarizedLight } from 'cm6-theme-solarized-light';
	import { onDestroy } from 'svelte';

	interface JsonEditorProps {
		value: object | undefined | null;
		id: string;
		onJsonEditorInput?: (
			event: ComponentEvent<string, HTMLDivElement>
		) => void;
	}
	let { value, id, onJsonEditorInput }: JsonEditorProps = $props();
	let stringData = $state(JSON.stringify(value, null, 2));
	let isDarkMode = $state(false);
	let intervalId: number | null | NodeJS.Timeout = null;

	$effect(() => {
		stringData = JSON.stringify(value, null, 2);
	});

	intervalId = setInterval(() => {
		isDarkMode = document.body.classList.contains('dark');
	}, 0);

	onDestroy(() => {
		clearInterval(intervalId as unknown as number);
	});

	const onCodeMirrorChange = (
		event: ComponentEvent<string, HTMLDivElement>
	) => {
		value = JSON.parse(event.value);
		if (typeof onJsonEditorInput === 'function') {
			const componentEvent = new ComponentEvent(
				event.value,
				event.target,
				event.raw
			);
			onJsonEditorInput(componentEvent);
		}
	};
</script>

<div
	class="jsonEditor"
	spellcheck="false">
	<CodeMirror
		mirrorId={id}
		bind:value={stringData}
		lang={json()}
		theme={isDarkMode ? solarizedDark : solarizedLight}
		{onCodeMirrorChange} />
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
