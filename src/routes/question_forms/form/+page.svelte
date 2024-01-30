<script lang="ts">
	import type { FormProperties, FormValue } from '@surveyplanet/types';
	import { Form } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: FormProperties['labels'] = $state([
		'First name',
		'Last name',
		'Email',
		'Phone number',
	]);
	let validations: FormProperties['validations'] = $state([
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
	]);
	let response: FormValue[] = $state([]);
	let requireAll: FormProperties['requireAll'] = $state();
	let random: FormProperties['random'] = $state();
	const formResponseHandler = (response: FormValue[]) => {
		events.push(JSON.stringify(response, null, 2));
	};

	let labelsStringed = $state(JSON.stringify(labels));
	let validationsString = $state(JSON.stringify(validations));

	$effect(() => {
		labels = JSON.parse(labelsStringed);
		validations = JSON.parse(validationsString);
	});
</script>

<Layout
	component="Form"
	example={source(id, labels, requireAll, random, validations, response)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			text
			bind:value={id} />
		<PropsChanger
			label="Labels"
			object
			bind:value={labelsStringed} />
		<PropsChanger
			label="Require all"
			checkbox
			bind:value={requireAll} />
		<PropsChanger
			label="Random"
			checkbox
			bind:value={random} />
		<PropsChanger
			label="Validations"
			object
			bind:value={validationsString} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Form
				{id}
				bind:labels
				{response}
				{random}
				formResponse={formResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss"></style>
