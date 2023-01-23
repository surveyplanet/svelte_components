<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import CheckRadio from '../../lib/CheckRadio.svelte';
	import argTypes from './checkradio_args';
</script>

<Meta
	title="CheckRadio/Default"
	component={CheckRadio}
	{argTypes} />

<Template let:args>
	<CheckRadio
		{...args}
		on:change={args.changeEventHandler} />
</Template>

<Story
	name="Primary Checkbox"
	let:args />

<Story
	name="Disabled Checkbox"
	args={{
		disabled: true,
		label: 'Disabled',
	}} />

<Story
	name="Primary Radio"
	source
	let:args>
	<CheckRadio
		{...args}
		type="radio"
		id="checkradio2"
		label="CheckRadio 2" />
</Story>

<Story
	name="Disabled Radio"
	source
	let:args>
	<CheckRadio
		{...args}
		type="radio"
		id="checkradio2"
		label="CheckRadio 2"
		checked />
</Story>

<Story
	name="Multiple checkboxes"
	source
	let:args>
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkradio2"
		label="CheckRadio 2" />
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkradio3"
		label="CheckRadio 3" />
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkradio4"
		label="CheckRadio 4" />
</Story>
