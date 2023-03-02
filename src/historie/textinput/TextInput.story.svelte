<script lang="ts">
	import { logEvent } from 'histoire/client';
	import source from './source';
	import { TextInput } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	let id: 'basic-text';
	let name: 'basic-text';
	let type = 'text';
	let value: string;
	let label = 'Text input';
	let placeholder: string;
	let multiline = false;
	let readonly = false;
	let disabled = false;
	// let cleaveOptions = {};
	// let validationRules: string[] = [];
	// let validationMessage: string;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story
	layout={{ type: 'grid', width: 500 }}
	title="Form controls / Text input">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={type}
			title="Type"
			options={['password', 'search', 'text']} />
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
	</svelte:fragment>

	<Hst.Variant
		title="Basic"
		{source}>
		<TextInput
			on:change={changeEventHandler}
			{disabled}
			{readonly}
			{multiline}
			{label}
			{placeholder}
			{type}
			{value}
			{name}
			{id} />
	</Hst.Variant>

	<Hst.Variant
		title="Validation"
		{source}>
		<TextInput
			on:change={changeEventHandler}
			{disabled}
			{readonly}
			{multiline}
			label="Email address"
			{placeholder}
			{type}
			{value}
			name="validate-text"
			id="validate-text"
			validationRules={['require', 'email']}
			validationMessage="What's the matter with you, you don't know your email address?" />
	</Hst.Variant>

	<Hst.Variant
		title="Masked"
		{source}>
		<TextInput
			on:change={changeEventHandler}
			{disabled}
			{readonly}
			{multiline}
			{label}
			{type}
			{value}
			name="masked-text"
			id="masked-text"
			placeholder="YYYY-MM-DD"
			cleaveOptions={{
				date: true,
				delimiter: '-',
				datePattern: ['Y', 'm', 'd'],
			}} />
	</Hst.Variant>
</Hst.Story>
