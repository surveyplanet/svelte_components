<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { TextInput } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	let id: string = (Date.now() + Math.random()).toString(36);
	let name: string;
	let type = 'text';
	let value: string | null = '';
	let label: string | null = null;
	let placeholder: string | null = null;
	let multiline = false;
	let readonly = false;
	let disabled = false;
	let attr = {};

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};

	const source = `<TextInput {bgColor} {textColor}>{content}</TextInput>`;
</script>

<Hst.Story title="Text Input">
	<svelte:fragment slot="controls">
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />

		<Hst.Checkbox
			bind:value={readonly}
			title="Readonly" />

		<Hst.Checkbox
			bind:value={multiline}
			title="Multiline" />

		<Hst.Text
			bind:value={label}
			title="Label" />

		<Hst.Text
			bind:value={placeholder}
			title="Placeholder" />

		<Hst.Text
			bind:value={name}
			title="Name" />

		<Hst.Text
			bind:value
			title="Value" />

		<Hst.Text
			bind:value={id}
			title="Id" />

		<Hst.Json
			bind:value={attr}
			title="Attributes" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<TextInput
			on:change={changeEventHandler}
			{disabled}
			{readonly}
			{multiline}
			{label}
			{placeholder}
			{attr}
			{value}
			{name}
			{id} />
	</Hst.Variant>
</Hst.Story>
