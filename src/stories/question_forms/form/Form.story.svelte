<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import type { FormProperties, FormValue } from '@surveyplanet/types';
	import { Form } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id: string = 'abc123';
	let labels: FormProperties['labels'] = [
		'First name',
		'Last name',
		'Email',
		'Phone number',
	];
	let validations: FormProperties['validations'] = [
		{
			label: 'First name',
			rule: 'required',
		},
		{
			label: 'Last name',
			rule: 'required',
		},
		{
			label: 'Email',
			rule: 'email',
		},
		{
			label: 'Phone number',
			rule: 'phone',
		},
	];
	let response: FormValue[] = [];
	let requireAll: FormProperties['requireAll'];
	let random: FormProperties['random'];
	const formInputHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Question forms / Form">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Json
			bind:value={labels}
			title="Labels" />
		<Hst.Json
			bind:value={validations}
			title="Validations" />
		<Hst.Json
			bind:value={response}
			title="Response" />
		<Hst.Checkbox
			bind:value={requireAll}
			title="Require All" />
		<Hst.Checkbox
			bind:value={random}
			title="Random" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(id, labels, requireAll, random, validations, response)}>
		<div class="wrapper">
			<Form
				{id}
				{labels}
				{requireAll}
				{random}
				{validations}
				{response}
				on:input={formInputHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
