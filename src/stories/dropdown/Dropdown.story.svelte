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

	let minSearchableItems = 5;
	let disabled = false;
	let required = false;
	let value = 'bengal-tiger';
	let label = 'Dropdown component';
</script>

<Hst.Story title="Form controls / Dropdown">
	<svelte:fragment slot="controls">
		<Hst.Json
			bind:value={data}
			title="Dropdown Items" />
		<Hst.Number
			bind:value={minSearchableItems}
			title="minSearchableItems" />
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
				{minSearchableItems}
				{disabled}
				{required}
				{value}
				{label}
				on:update={(e) => {
					value = e.detail;
					logEvent('change', e.detail);
				}}
				on:toggle={(e) => {
					logEvent('toggle', e.detail);
				}}
				on:search={(e) => {
					logEvent('search', e.detail);
				}}
				on:close={(e) => {
					logEvent('close', e.detail);
				}} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 50px;
	}
</style>
