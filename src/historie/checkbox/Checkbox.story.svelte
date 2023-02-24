<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Checkbox } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	let id: string;
	let name: 'checkbox';
	let value: string;
	let label = 'Checkbox';
	let checked = false;
	let disabled = false;
	let prependLabel = false;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};

	const source = `<Checkbox {bgColor} {textColor}>{content}</Checkbox>`;
</script>

<Hst.Story title="Form controls / checkbox">
	<svelte:fragment slot="controls">
		<Hst.Checkbox
			bind:value={checked}
			title="Checked" />
		<Hst.Text
			bind:value={name}
			title="Name" />
		<Hst.Text
			bind:value
			title="Value" />
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Checkbox
			bind:value={prependLabel}
			title="Prepend label" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
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
			{value}
			{name}
			{id} />
	</Hst.Variant>
</Hst.Story>
