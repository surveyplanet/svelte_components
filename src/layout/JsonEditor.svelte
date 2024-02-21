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

{#key StringData}
	<CodeMirror
		bind:value={StringData}
		lang={json()}
		{onCodeMirrorChange} />
{/key}
