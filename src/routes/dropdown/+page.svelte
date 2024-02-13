<script lang="ts">
	import { Dropdown, type DropdownOption } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let keys = $state(0);

	let options: DropdownOption[] = $state([
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

	let searchThreshold = $state(2);
	let disabled = $state(false);
	let required = $state(false);
	let value = $state('');
	let placeholder = $state('Choose one');
	let label = $state('Dropdown component');
	let size: 'small' | 'medium' | 'large' = $state('small');

	const onDropdownChange = (value: string) => {
		events.push(value);
	};

	// $inspect(searchThreshold);

	// let stringedOptions = $state(JSON.stringify(options));

	// $effect(() => {
	// 	options = JSON.parse(stringedOptions);
	// });
</script>

<Layout
	component="Dropdown"
	example={source({
		options,
		searchThreshold,
		disabled,
		required,
		value,
		placeholder,
		label,
		size,
	})}
	{md}
	bind:events>
	{#snippet controls()}
		<!-- <PropsChanger
			label="Options"
			bind:value={stringedOptions} /> -->
		<PropsChanger
			label="Search threshold"
			bind:value={searchThreshold} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Required"
			bind:value={required} />
		<PropsChanger
			label="Value"
			bind:value />
		<PropsChanger
			label="Placeholder"
			bind:value={placeholder} />
		<PropsChanger
			label="Label"
			bind:value={label} />
		<PropsChanger
			label="Size"
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
				bind:value
				{placeholder}
				{label}
				{size}
				{onDropdownChange} />
		{/key}
	{/snippet}
</Layout>
