<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import source from './source';
	import { TextInput, type TextInputType } from '$lib';

	export let Hst: Histoire;

	let id = 'basic-text';
	let name = 'basic-text';
	let type: TextInputType = 'text';
	let value: string;
	let label = 'Text input';
	let placeholder = 'Placeholder';
	let multiline = false;
	let readonly = false;
	let disabled = false;
	let cleaveOptions = {};
	let validationRules: string[] = [];
	let validationMessage: string;
	let size: 'small' | 'medium' | 'large' = 'small';

	const changeHandler = (e: Event): void => {
		logEvent('change', e);
	};

	const focusHandler = (event: Event) => {
		logEvent('focus', event);
	};

	// ignore blur events
	// const blurHandler = (event: Event) => {
	// 	logEvent('blur', event);
	// };

	const keydownHandler = (event: Event) => {
		logEvent('keydown', event);
	};

	const keyupHandler = (event: Event) => {
		logEvent('keyup', event);
	};
</script>

<Hst.Story title="Form controls / Text input">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />

		<Hst.Text
			bind:value={name}
			title="Name" />

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
			bind:value
			title="Value" />

		<Hst.Text
			bind:value={validationMessage}
			title="Validation message" />

		<Hst.Json
			bind:value={validationRules}
			title="Validation rules" />

		<Hst.Json
			bind:value={cleaveOptions}
			title="Mask options" />

		<Hst.Select
			bind:value={size}
			title="Size"
			options={['small', 'medium', 'large']} />
	</svelte:fragment>

	<Hst.Variant
		title="Basic"
		source={source(id, name, type, value, label, placeholder, multiline, readonly, disabled, cleaveOptions, validationRules, validationMessage, size)}>
		<div class="wrapper">
			<TextInput
				on:change={changeHandler}
				on:focus={focusHandler}
				on:keydown={keydownHandler}
				on:keyup={keyupHandler}
				{disabled}
				{readonly}
				{multiline}
				{label}
				{placeholder}
				{type}
				{value}
				{name}
				{id}
				{size}
				{validationRules}
				{validationMessage}
				{cleaveOptions} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
