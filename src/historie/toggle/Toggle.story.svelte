<script lang="ts">
	import { logEvent } from 'histoire/client';
	import source from './source';
	import { Toggle } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	let id = (Date.now() + Math.random()).toString(36);
	let on = false;
	let disabled = false;
	let tall = false;
	let name: string;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title="Form controls / Toggle">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Text
			bind:value={name}
			title="Name" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={tall}
			title="Tall" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Toggle
			on:change={changeEventHandler}
			{disabled}
			{name}
			{id} />
	</Hst.Variant>
</Hst.Story>
