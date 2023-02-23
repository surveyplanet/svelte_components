<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Checkbox } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	let id: string = (Date.now() + Math.random()).toString(36);
	let name: 'checkbox';
	let value: string | null = null;
	let label = '';
	let checked = false;
	let disabled = false;
	let prependLabel = false;
	let attr = {};

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};

	const source = `<Checkbox {bgColor} {textColor}>{content}</Checkbox>`;
</script>

<Hst.Story title="Checkbox">
	<svelte:fragment slot="controls">
		<Hst.Checkbox
			bind:value={checked}
			title="Checked" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={prependLabel}
			title="Prepend label" />
		<Hst.Text
			bind:value={label}
			title="Label" />
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
		<Checkbox
			on:change={changeEventHandler}
			{checked}
			{disabled}
			{prependLabel}
			{label}
			{attr}
			{value}
			{name}
			{id} />
	</Hst.Variant>
</Hst.Story>
