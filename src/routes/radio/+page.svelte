<script lang="ts">
	import { Radio, type ComponentEvent, type RadioProps } from '$lib';

	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state<ComponentEvent<boolean>[]>([]);

	let id: RadioProps['id'] = 'radio';
	let name: RadioProps['name'] = $state('stooge');
	let label: RadioProps['label'] = $state('Harry');
	let labelTwo: RadioProps['label'] = $state('Larry');
	let labelThree: RadioProps['label'] = $state('Moe');
	let disabled: RadioProps['disabled'] = $state(false);
	let prependLabel: RadioProps['prependLabel'] = $state(false);
	let size: RadioProps['size'] = $state('small');

	const onRadioChange = (event: ComponentEvent<boolean>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Radio"
	example={source({ id, name, label, disabled, prependLabel, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Name"
			bind:value={name} />
		<PropsChanger
			label="Label One"
			bind:value={label} />
		<PropsChanger
			label="Label Two"
			bind:value={labelTwo} />
		<PropsChanger
			label="Label Three"
			bind:value={labelThree} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Prepend Label"
			bind:value={prependLabel} />
		<PropsChanger
			label="Size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<div id="wrapper">
			<Radio
				id={label!.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={label}
				{label}
				{prependLabel}
				{size}
				{onRadioChange} />
			<Radio
				id={labelTwo!.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelTwo}
				label={labelTwo}
				{prependLabel}
				{size}
				{onRadioChange} />
			<Radio
				id={labelThree!.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelThree}
				label={labelThree}
				{prependLabel}
				{size}
				{onRadioChange} />
		</div>
	{/snippet}
</Layout>

<style>
	#wrapper {
		display: flex;
		gap: 24px;
		padding: 24px;
	}
</style>
