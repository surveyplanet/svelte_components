<script lang="ts">
	import { Dropdown, type DropdownOptions } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
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
		console.log('dropdownChangeHandler', value);
		events.push(value);
	};
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
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				object="Options"
				value={JSON.stringify(options, null, 2)}
				oninput={(e: Event) => {
					options = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="Search threshold"
				value={searchThreshold}
				oninput={(e: Event) => {
					searchThreshold = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				boolean="Disabled"
				value={disabled}
				oninput={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="Required"
				value={required}
				oninput={(e: Event) => {
					required = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				text="Value"
				{value}
				oninput={(e: Event) => {
					value = (e.target as HTMLInputElement).value 
				}} />
			<PropsChanger
				text="Placeholder"
				value={placeholder}
				oninput={(e: Event) => {
					placeholder = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Label"
				value={label}
				oninput={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				select="Size"
				selectOptions={['small', 'medium', 'large']}
				value={size}
				oninput={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		{#key keys}
			<Dropdown
				{options}
				{searchThreshold}
				{disabled}
				{required}
				{value}
				{placeholder}
				{label}
				{size}
				onchange={dropdownChangeHandler} />
		{/key}
	</svelte:fragment>
</Layout>
