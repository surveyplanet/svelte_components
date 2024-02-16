<script lang="ts">
	import type { FormProperties, FormValue } from '@surveyplanet/types';
	import { ComponentEvent, Form } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<FormValue[][]>([]);
	// let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: FormProperties['labels'] = $state([
		'First name',
		'Last name',
		'Email',
		'Phone number',
	]);
	// let validations: FormProperties['validations'] = $state([
	// 	{
	// 		label: 'First name',
	// 		rule: 'required',
	// 	},
	// 	{
	// 		label: 'Last name',
	// 		rule: 'required',
	// 	},
	// 	{
	// 		label: 'Email',
	// 		rule: 'email',
	// 	},
	// 	{
	// 		label: 'Phone number',
	// 		rule: 'phone',
	// 	},
	// ]);
	let response: FormValue[] = $state([]);
	let requireAll: FormProperties['requireAll'] = $state();
	let random: FormProperties['random'] = $state();
	const formResponseHandler = (event: ComponentEvent<FormValue[]>) => {
		events.push(event.value);
	};

	// let labelsStringed = $state(JSON.stringify(labels));
	// let validationsString = $state(JSON.stringify(validations));

	// $effect(() => {
	// 	labels = JSON.parse(labelsStringed);
	// 	validations = JSON.parse(validationsString);
	// });
</script>

<Layout
	component="Form"
	example={source({ id, labels, random, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<!-- <PropsChanger
			label="Labels"
			bind:value={labelsStringed} /> -->
		<PropsChanger
			label="Require all"
			bind:value={requireAll} />
		<PropsChanger
			label="Random"
			bind:value={random} />
		<!-- <PropsChanger
			label="Validations"
			bind:value={validationsString} /> -->
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Form
				{id}
				bind:labels
				{response}
				{random}
				onFormResponse={formResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss"></style>
