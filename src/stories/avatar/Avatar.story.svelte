<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import source from './source';
	import { Avatar, MASCOTS } from '$lib';

	export let Hst: Histoire;

	// let profileImage = '';
	let profileImage = 'https://loremflickr.com/500/500/headshot';
	let id = 'my-uniqie-id@example.com';
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

		<Hst.Text
			bind:value={id}
			title="Unique Identifier" />
		<Hst.Text
			bind:value={profileImage}
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
			{profileImage}
			{size}
			{disabled}
			{id} />
	</Hst.Variant>
</Hst.Story>
