<script lang="ts">
	import { ComponentEvent, Dropdown, type DropdownProps } from '$lib';
	// import { menuData } from '../menu/menu_data';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let keys = $state(0);
	const reset = () => {
		keys = keys++;
	};
	let events: ComponentEvent<string, HTMLInputElement>[] = $state([]);

	let options: DropdownProps['options'] = $state([
		{
			label: 'New',
			id: 'new',
			meta: ' N',
			icon: 'plus',
			selected: false,
		},
		{
			label: 'Open',
			id: 'open',
			meta: ' O',
			icon: 'share2',
			selected: false,
		},
		{
			label: 'Save',
			id: 'save',
			meta: ' S',
			icon: 'arrowUp',
			selected: false,
		},
		{
			label: 'Close',
			id: 'close',
			icon: 'x',
			meta: ' W',
			selected: false,
		},
		{
			label: 'Edit',
			id: 'edit',
			icon: 'edit',
			selected: false,
			submenu: [
				{
					label: 'Undo',
					id: 'undo',
					meta: '',
					selected: false,
				},
				{
					label: 'Redo',
					id: 'redo',
					meta: '',
					selected: false,
				},
			],
		},
	]);
	// let options: DropdownProps['options'] = $state(menuData);
	let searchThreshold: DropdownProps['searchThreshold'] = $state(10);
	let disabled: DropdownProps['disabled'] = $state(false);
	let required: DropdownProps['required'] = $state(false);
	let value: DropdownProps['value'] = $state('');
	let placeholder: DropdownProps['placeholder'] = $state('Choose one');
	let label: DropdownProps['label'] = $state('Dropdown component');
	let size: DropdownProps['size'] = $state('small');

	const onDropdownChange = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		events.push(event);
	};
	let btoaProps = $derived(
		btoa(
			JSON.stringify({
				options,
				searchThreshold,
				disabled,
				required,
				value,
				placeholder,
				label,
				size,
			})
		)
	);
</script>

<Layout
	{btoaProps}
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
		<PropsChanger
			label="Options"
			bind:value={options} />
		<PropsChanger
			label="Search threshold"
			type="number"
			bind:value={searchThreshold}
			onPropsChangerInput={reset} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Required"
			bind:value={required} />
		<PropsChanger
			label="Value"
			type="string"
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
				bind:searchThreshold
				{disabled}
				{required}
				bind:value
				{placeholder}
				{label}
				bind:size
				{onDropdownChange} />
		{/key}
	{/snippet}
</Layout>

<style lang="scss">
</style>
