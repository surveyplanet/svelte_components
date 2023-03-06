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
		<ul class="form-wrapper">
			<Form
				on:submit={submitHandler}
				{id}>
				<li>
					<TextInput
						id="first_name"
						label="First name"
						name="First name" />
				</li>
				<li>
					<TextInput
						id="last_name"
						name="last_name"
						label="Last name" />
				</li>
				<li>
					<TextInput
						id="email"
						name="email"
						label="Email"
						validationRules={['required', 'email']} />
				</li>
				<li>
					<div style="display: flex; gap: 10px">
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
				</li>
				<li>
					<Checkbox
						id="checkbox"
						name="checkbox"
						label="Accept"
						value="checkbox pass" />
				</li>
				<li>
					<Toggle
						id="toggle"
						name="toggle" />
				</li>
				<li>
					<Button type="submit">Submit</Button>
				</li>
			</Form>
		</ul>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	ul.form-wrapper {
		list-style: none;
		margin: 0;
		padding: 25px;
		li {
			padding: 10px 0;
		}
	}
</style>
