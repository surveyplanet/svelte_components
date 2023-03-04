<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import source from './source';
	import {
		Form,
		Button,
		TextInput,
		Radio,
		Checkbox,
		Toggle,
	} from '../../lib';
	export let Hst: Histoire;

	export let id: string | null = null;

	const submitHandler = (e: Event): void => {
		logEvent('submit', e);
	};
</script>

<Hst.Story title="Form controls / Form">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
	</svelte:fragment>
	<Hst.Variant
		title="Primary"
		{source}>
		<div class="formWrapper">
			<Form
				on:submit={submitHandler}
				{id}>
				<TextInput
					id="first_name"
					label="First name"
					name="First name" />
				<TextInput
					id="last_name"
					name="last_name"
					label="Last name" />
				<TextInput
					id="email"
					name="email"
					label="Email" />
				<div style="display: flex;">
					<Radio
						id="larry"
						name="stooge"
						value="larry"
						label="Larry" />
					<Radio
						id="curly"
						name="stooge"
						value="curly"
						label="Curly" />
					<Radio
						id="moe"
						name="stooge"
						value="moe"
						label="Moe" />
				</div>
				<Checkbox
					id="checkbox"
					name="checkbox"
					label="Accept"
					value="checkbox pass" />
				<Toggle
					id="toggle"
					name="toggle" />
				<Button type="submit">Submit</Button>
			</Form>
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.formWrapper {
		width: 400px;
	}
</style>
