<script lang="ts">
	import type { FormProperties, FormValue } from '@surveyplanet/types';
	import { ComponentEvent, Form } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<FormValue[], HTMLInputElement>[]>([]);

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
	const formResponseHandler = (
		event: ComponentEvent<FormValue[], HTMLInputElement>
	) => {
		events.push(event);
	};
</script>

<Layout
	component="Form"
	example={source({ labels, random, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Labels"
			bind:value={labels} />
		<PropsChanger
			label="Require all"
			bind:value={requireAll} />
		<PropsChanger
			label="Random"
			bind:value={random} />
		<PropsChanger
			label="Validations"
			bind:value={validations} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Form
				bind:labels
				{response}
				{random}
				onFormResponse={formResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style lang="scss"></style>
