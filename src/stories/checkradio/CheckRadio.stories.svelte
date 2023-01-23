<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { attr } from 'svelte/internal';
	import CheckRadio from '../../lib/CheckRadio.svelte';
</script>

<Meta
	title="CheckRadio/Default"
	component={CheckRadio}
	argTypes={{
		type: {
			control: {
				type: 'select',
				options: ['checkbox', 'radio'],
			},
		},
		id: {
			control: {
				type: 'text',
			},
		},
		value: {
			control: {
				type: 'text',
			},
		},
		label: {
			control: {
				type: 'text',
			},
		},
		checked: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		prependLabel: {
			control: {
				type: 'boolean',
			},
		},
		changeHandler: { action: 'change' },
	}} />

<Template let:args>
	<CheckRadio
		{...args}
		label="Primary"
		id="checkPrimary"
		on:change={args.changeEventHandler} />
</Template>

<Story name="Checkbox" />

<Story
	name="Disabled Checkbox"
	source
	let:args>
	<CheckRadio
		{...args}
		id="disabledCheckbox"
		disabled />
</Story>

<Story
	name="Multiple checkboxes"
	source
	let:args>
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkbox"
		label="Check 1 "
		prependLabel
		value="1" />
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkbox"
		label="Check 2"
		prependLabel
		value="2" />
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkbox"
		label="Check 3"
		prependLabel
		value="3" />
</Story>

<Story
	name="Radio"
	source
	let:args>
	<CheckRadio
		{...args}
		type="radio"
		id="radioPrimary"
		label="Radio Primary" />
</Story>

<Story
	name="Disabled Radio"
	source
	let:args>
	<CheckRadio
		{...args}
		type="radio"
		id="radioDisabled"
		label="Disabled"
		disabled />
</Story>

<Story
	name="Multiple radios"
	source
	let:args>
	<CheckRadio
		{...args}
		type="radio"
		id="radio"
		prependLabel
		label="Radio 1" />
	<CheckRadio
		{...args}
		type="radio"
		id="radio"
		prependLabel
		label="Radio 2" />
	<CheckRadio
		{...args}
		type="radio"
		id="radio"
		prependLabel
		label="Radio 3" />
</Story>

<Story
	name="Prepend Label"
	source
	let:args>
	<CheckRadio
		{...args}
		type="checkbox"
		id="prependLabel"
		label="Prepend Label Checkbox"
		prependLabel />
	<CheckRadio
		{...args}
		type="radio"
		id="prependLabe"
		label="Prepend Label Radio"
		prependLabel />
</Story>

<Story
	name="Attributes "
	source
	let:args>
	<CheckRadio
		{...args}
		type="checkbox"
		id="prependLabelDisabled"
		label="Prepend Label"
		attr={{ 'data-test': 'test', 'data-test2': 'test2' }} />
</Story>
