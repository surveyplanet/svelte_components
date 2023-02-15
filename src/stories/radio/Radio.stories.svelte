<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Radio } from '../../lib';
	import * as test from './radio.test';

	const argTypes = {
		changeHandler: { action: 'change' },
		id: { control: { type: 'text' }, defaultValue: 'my-radio' },
		name: { control: { type: 'text' }, defaultValue: 'radio-group' },
		value: { control: { type: 'text' }, defaultValue: 'my radio' },
		label: { control: { type: 'text' }, defaultValue: 'Radio Button' },
		checked: { control: { type: 'boolean' }, defaultValue: false },
		disabled: { control: { type: 'boolean' }, defaultValue: false },
		prependLabel: { control: { type: 'boolean' }, defaultValue: false },
		// attr ={control: {type: {}}}
	};
</script>

<Meta
	title="Form controls/Radio"
	component={Radio}
	{argTypes} />

<Template let:args>
	<Radio
		{...args}
		on:change={args.changeHandler} />
</Template>

<Story
	name="Default"
	args={{
		label: 'Radio Button',
		id: 'default',
		name: 'default',
		value: 'default',
		attr: { 'data-test': 'yep' },
	}}
	play={test.primary} />

<Story
	name="Disabled"
	args={{
		label: 'Disabled',
		id: 'disable',
		name: 'disable',
		value: 'disable',
		disabled: true,
	}}
	play={test.disabled} />

<Story
	name="Prepend Label"
	args={{
		label: 'Prepended',
		prependLabel: true,
		id: 'prepend',
		name: 'prepend',
		value: 'prepend',
	}}
	play={test.prepended} />

<Story
	name="Multiple"
	let:args
	play={test.multiple}>
	<Radio
		id="larry"
		name="stooge"
		value="larry"
		label="Larry"
		on:change={args.changeHandler} />
	<Radio
		id="curly"
		name="stooge"
		value="curly"
		label="Curly"
		on:change={args.changeHandler} />
	<Radio
		id="moe"
		name="stooge"
		value="moe"
		label="Moe"
		on:change={args.changeHandler} />
</Story>
