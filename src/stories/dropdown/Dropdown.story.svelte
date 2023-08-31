<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Dropdown, type DropdownOptions } from '$lib';
	import { logEvent } from 'histoire/client';

	import { default as source } from './source';
	export let Hst: Histoire;

	let options: DropdownOptions[] = [
		// {
		// 	label: 'None',
		// 	id: '',
		// },
		{
			label: 'Bengal tiger',
			id: 'bengal-tiger',
			meta: 'endangered',
		},
		{
			label: 'Siberian tiger',
			id: 'siberian-tiger',
			meta: 'endangered',
		},
		{
			label: 'Sumatran tiger',
			id: 'sumatran-tiger',
			meta: 'endangered',
		},
		{
			label: 'Caspian tiger',
			id: 'caspian-tiger',
			meta: 'extinct',
		},
		{
			label: 'Indochinese tiger',
			id: 'indochinese-tiger',
			meta: 'endangered',
		},
		{
			label: 'Malayan tiger',
			id: 'malayan-tiger',
			meta: 'endangered',
		},
		{
			label: 'South China tiger',
			id: 'south-china-tiger',
			meta: 'endangered',
		},
	];

	let searchThreshold = 10;
	let disabled = false;
	let required = false;
	let value = options[3].id;
	let placeholder = 'Choose one';
	let label = 'Dropdown component';
	let size: 'small' | 'medium' | 'large' = 'small';

	const dropdownChangeHandler = (event: CustomEvent) => {
		value = event.detail;
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Form controls / Dropdown">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={options}
			title="Dropdown Items" />
		<Hst.Number
			bind:value={searchThreshold}
			title="Search threshold" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={required}
			title="Required" />
		<Hst.Text
			bind:value={placeholder}
			title="Placeholder" />
		<Hst.Text
			bind:value
			title="Value" />
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={['small', 'medium', 'large']} />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(
			options,
			searchThreshold,
			disabled,
			required,
			value,
			placeholder,
			label,
			size
		)}>
		<div class="wrapper">
			<Dropdown
				bind:options
				{searchThreshold}
				{placeholder}
				{disabled}
				{required}
				{value}
				{label}
				{size}
				on:change={dropdownChangeHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
