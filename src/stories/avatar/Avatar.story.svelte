<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import source from './source';
	import { Avatar } from '../../lib';
	import { MASCOTS } from '../../lib/_definitions';

	export let Hst: Histoire;

	let imgSrc = MASCOTS.marvin;
	let id = '';
	let size: 'small' | 'medium' | 'large' = 'large';
	let disabled = false;

	const clickHandler = (e: Event): void => {
		if (disabled) {
			return;
		}
		logEvent('click', e);
	};
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={size}
			title="Size"
			options={[
				{ label: 'Small', value: 'small' },
				{ label: 'Medium', value: 'medium' },
				{ label: 'Large', value: 'large' },
			]} />
		<Hst.Select
			bind:value={imgSrc}
			title="Mascot"
			options={Object.keys(MASCOTS).map((key) => {
				return {
					label: key.charAt(0).toUpperCase() + key.slice(1),
					value: MASCOTS[key],
				};
			})} />
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Text
			bind:value={imgSrc}
			title="Image source" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
	</svelte:fragment>

	<Hst.Variant
		title="Avatar"
		{source}>
		<Avatar
			on:click={clickHandler}
			{imgSrc}
			{size}
			{disabled}
			{id} />
	</Hst.Variant>
</Hst.Story>
