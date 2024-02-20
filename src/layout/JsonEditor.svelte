<script lang="ts">
	import CodeMirror from './code_mirror/CodeMirror.svelte';
	import { json } from '@codemirror/lang-json';

	let { data } = $props();

	let StringData = $state(JSON.stringify(data, null, 2));

	$effect(() => {
		data = JSON.parse(StringData);
	});
</script>

<CodeMirror
	bind:value={StringData}
	lang={json()}
	onCodeMirrorChange={() => {
		console.log('changed');
	}} />
