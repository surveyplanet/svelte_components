<script lang="ts">
	import { Dropdown, type DropdownOptions } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	let options: DropdownOptions[] = $state([
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
	]);

	let searchThreshold = $state(10);
	let disabled = $state(false);
	let required = $state(false);
	let value = $state<string | undefined>(undefined);
	let placeholder = $state('Choose one');
	let label = $state('Dropdown component');
	let size: 'small' | 'medium' | 'large' = $state('small');

	const dropdownChangeHandler = (value: string) => {
		events.push(value);
	};

	let stringedOptions = $state(JSON.stringify(options));

	$effect(() => {
		options = JSON.parse(stringedOptions);
	});
</script>

<Layout
	component="Dropdown"
	example={source(
		options,
		searchThreshold,
		disabled,
		required,
		value,
		placeholder,
		label,
		size
	)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Options"
			object
			bind:value={stringedOptions} />
		<PropsChanger
			label="Search threshold"
			number
			bind:value={searchThreshold} />
		<PropsChanger
			label="Disabled"
			checkbox
			bind:value={disabled} />
		<PropsChanger
			label="Required"
			checkbox
			bind:value={required} />
		<PropsChanger
			label="Value"
			text
			bind:value />
		<PropsChanger
			label="Placeholder"
			text
			bind:value={placeholder} />
		<PropsChanger
			label="Label"
			text
			bind:value={label} />
		<PropsChanger
			label="Size"
			select
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		{#key keys}
			<Dropdown
				bind:options
				{searchThreshold}
				{disabled}
				{required}
				{value}
				{placeholder}
				{label}
				{size}
				onchange={dropdownChangeHandler} />
		{/key}
	{/snippet}
</Layout>
