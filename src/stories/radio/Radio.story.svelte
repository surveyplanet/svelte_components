<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import { Radio } from '../../lib';
	import source from './source';

	export let Hst: Histoire;

	let name = 'stooge';
	let labelOne = 'Harry';
	let labelTwo = 'Larry';
	let labelThree = 'Moe';
	let disabled = false;
	let prependLabel = false;
	let size: 'small' | 'medium' | 'large' = 'small';

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title="Form controls / Radio">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={name}
			title="Name" />
		<Hst.Text
			bind:value={labelOne}
			title="Label 1" />
		<Hst.Text
			bind:value={labelTwo}
			title="Label 2" />
		<Hst.Text
			bind:value={labelThree}
			title="Label 3" />
		<Hst.Checkbox
			bind:value={prependLabel}
			title="Prepend label" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={['small', 'medium', 'large']} />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<div id="wrapper">
			<Radio
				id={labelOne.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelOne}
				label={labelOne}
				{prependLabel}
				{size}
				on:change={changeEventHandler} />
			<Radio
				id={labelTwo.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelTwo}
				label={labelTwo}
				{prependLabel}
				{size}
				on:change={changeEventHandler} />
			<Radio
				id={labelThree.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelThree}
				label={labelThree}
				{prependLabel}
				{size}
				on:change={changeEventHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	#wrapper {
		display: flex;
		gap: 24px;
		padding: 24px;
	}
</style>
