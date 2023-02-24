<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { TextInput } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	let id: string;
	let name: string;
	let type = 'text';
	let value = '';
	let label: string;
	let placeholder: string;
	let multiline = false;
	let readonly = false;
	let disabled = false;
	let cleaveOptions = {};
	let validationRules: string[] = [];
	let validationMessage: string;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};

	const source = `<TextInput {bgColor} {textColor}>{content}</TextInput>`;
</script>

<Hst.Story
	layout={{ type: 'grid', width: 500 }}
	title="Form controls / Text input">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={type}
			title="Type"
			options={[
				'color',
				'date',
				'datetime-local',
				'email',
				'file',
				'hidden',
				'image',
				'month',
				'number',
				'password',
				'search',
				'text',
				'time',
				'url',
			]} />
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
			{label}
			{placeholder}
			{type}
			{value}
			{name}
			{id}
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
			{name}
			{id}
			placeholder="YYYY-MM-DD"
			cleaveOptions={{
				date: true,
				delimiter: '-',
				datePattern: ['Y', 'm', 'd'],
			}} />
	</Hst.Variant>
</Hst.Story>
