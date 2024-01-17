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
	let value = $state(options[3].id);
	let placeholder = $state('Choose one');
	let label = $state('Dropdown component');
	let size: 'small' | 'medium' | 'large' = $state('small');

	const dropdownChangeHandler = (event: CustomEvent) => {
		value = event.detail;
		console.log('dropdownChangeHandler', value);
		events.push('change');
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
				textInputHandler={(e: Event) => {
					options = JSON.parse((e.target as HTMLInputElement).value);
				}}
				blurHandler={() => {
					keys++;
					console.log('keys', keys);
				}}
				value={JSON.stringify(options, null, 2)} />
			<PropsChanger
				number="Search threshold"
				textInputHandler={(e: Event) => {
					searchThreshold = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				boolean="Disabled"
				booleanInputHandler={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="Required"
				booleanInputHandler={(e: Event) => {
					required = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				text="Value"
				textInputHandler={(e: Event) => {
					value = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Placeholder"
				textInputHandler={(e: Event) => {
					placeholder = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Label"
				textInputHandler={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Size"
				textInputHandler={(e: Event) => {
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
				on:change={dropdownChangeHandler} />
		{/key}
	</svelte:fragment>
</Layout>
