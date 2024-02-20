<script lang="ts">
	// import { editor } from 'monaco-editor';

	interface JsonEditorProps<T extends object | any[]> {
		value: T;
	}

	let { value } = $props<JsonEditorProps<any>>();

	let jsonCache: string = $derived(JSON.stringify(value, null, 4));

	const hasChanged = () => {
		return jsonCache !== JSON.stringify(value, null, 4);
	};

	$effect(() => {
		if (hasChanged()) {
			value = JSON.stringify(value, null, 4);
		}
	});
</script>

<textarea id="code-editor">
	{value}
</textarea>
