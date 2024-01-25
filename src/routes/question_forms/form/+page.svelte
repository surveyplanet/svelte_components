<script lang="ts">
	import type { FormProperties, FormValue } from '@surveyplanet/types';
	import { Form } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

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
</script>

<Layout
	component="Form"
	example={source(id, labels, requireAll, random, validations, response)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id} />
			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)} />
			<PropsChanger
				object="Validations"
				value={JSON.stringify(validations)} />
			<PropsChanger
				object="Response"
				value={response.toString()} />
			<PropsChanger
				boolean="Require all"
				value={requireAll} />
			<PropsChanger
				boolean="Random"
				value={random} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Form
				{id}
				{labels}
				{response}
				{random}
				formResponse={formResponseHandler} />
		</div>
	</svelte:fragment>
</Layout>

<style lang="scss"></style>
