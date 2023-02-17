<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Checkbox } from '../../lib';
	import * as test from './checkbox.test';

	const argTypes = {
		changeHandler: { action: 'change' },
		id: { control: { type: 'text' }, defaultValue: 'my-checkbox' },
		name: { control: { type: 'text' } },
		value: { control: { type: 'text' }, defaultValue: 'my checkbox' },
		label: { control: { type: 'text' }, defaultValue: 'Checkbox' },
		checked: { control: { type: 'boolean' }, defaultValue: false },
		disabled: { control: { type: 'boolean' }, defaultValue: false },
		prependLabel: { control: { type: 'boolean' }, defaultValue: false },
		// attr ={control: {type: {}}}
	};
</script>

<Meta
	title="Form controls/Checkbox"
	component={Checkbox}
	{argTypes} />

<Template let:args>
	<Checkbox
		{...args}
		on:change={args.changeHandler} />
</Template>

<Story
	name="Default"
	args={{
		label: 'Subscribe',
		name: 'SubscribeCheckbox',
		value: 'subscribe',
		id: 'subscribe-checkbox',
		attr: {
			'data-id': '123abc',
		},
	}}
	play={test.primary} />

<Story
	name="Disabled"
	args={{
		label: 'Disabled',
		disabled: true,
		value: 'disabled',
		name: 'disabledName',
		id: 'disabled-checkbox',
	}}
	play={test.disabled} />

<Story
	name="Prepend Label"
	args={{
		label: 'Prepended Label',
		prependLabel: true,
		value: 'prepended',
		name: 'prepended',
		id: 'prepended-checkbox',
	}}
	play={test.prepended} />

<Story
	name="Multiple"
	let:args
	play={test.multiple}>
	<Checkbox
		{...args}
		id="book1"
		label="War and Peace"
		name="books1"
		value="War and Peace"
		on:change={args.changeHandler} />

	<Checkbox
		{...args}
		id="book2"
		name="books2"
		label="East of Eden"
		value="East of Eden"
		on:change={args.changeHandler} />

	<Checkbox
		{...args}
		id="book3"
		name="books3"
		label="Of Mice and Men"
		value="Of Mice and Men"
		on:change={args.changeHandler} />
</Story>
