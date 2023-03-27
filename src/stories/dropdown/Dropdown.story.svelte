<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Dropdown, type dropdownData } from '../../lib';
	import { logEvent } from 'histoire/client';

	// import { default as source } from './source';
	export let Hst: Histoire;

	let data: dropdownData[] = [
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

	let searchThreshold = 5;
	let disabled = false;
	let required = false;
	let value = 'bengal-tiger';
	let label = 'Dropdown component';

	const dropdownChangeHandler = (event: CustomEvent) => {
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Form controls / Dropdown">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
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
			bind:value
			title="Value" />
		<Hst.Text
			bind:value={label}
			title="Label" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div class="wrapper">
			<Dropdown
				{data}
				{searchThreshold}
				{disabled}
				{required}
				{value}
				{label}
				on:change={dropdownChangeHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
