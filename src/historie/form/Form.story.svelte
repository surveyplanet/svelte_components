<script lang="ts">
	import { logEvent } from 'histoire/client';
	import {
		Form,
		Button,
		TextInput,
		Radio,
		Checkbox,
		Toggle,
	} from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

	export let id: string | null = null;
	export let attr: object | null = null;

	const submitHandler = (e: Event): void => {
		logEvent('submit', e);
	};

	const source = `<Form {bgColor} {textColor}>{content}</Form>`;
</script>

<Hst.Story title="Form controls / Form">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Json
			bind:value={attr}
			title="Attributes" />
	</svelte:fragment>
	<Hst.Variant
		title="Primary"
		{source}>
		<Form
			on:submit={submitHandler}
			{id}
			{attr}>
			<TextInput
				label="First name"
				name="name" />
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
	</Hst.Variant>
</Hst.Story>
