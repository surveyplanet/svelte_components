<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import CheckRadio from '../../lib/CheckRadio.svelte';
	import * as test from './checkradio.test';
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
		on:change={args.changeHandler} />
</Template>

<Story
	name="Checkbox"
	play={test.primaryCheckbox} />

<Story
	name="Disabled Checkbox"
	source
	let:args
	play={test.disabledCheckbox}>
	<CheckRadio
		{...args}
		id="disabledCheckbox"
		disabled />
</Story>

<Story
	name="Multiple checkboxes"
	source
	let:args
	play={test.multipleCheckboxes}>
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkbox1"
		label="Check 1 "
		prependLabel
		value="1"
		on:change={args.changeHandler} />
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkbox2"
		label="Check 2"
		prependLabel
		value="2"
		on:change={args.changeHandler} />
	<CheckRadio
		{...args}
		type="checkbox"
		id="checkbox3"
		label="Check 3"
		prependLabel
		value="3"
		disabled />
</Story>

<Story
	name="Radio"
	source
	let:args
	play={test.primaryRadio}>
	<CheckRadio
		{...args}
		type="radio"
		id="radioPrimary"
		label="Radio Primary"
		on:change={args.changeHandler} />
</Story>

<Story
	name="Disabled Radio"
	source
	let:args
	play={test.disabledRadio}>
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
		label="Radio 1"
		on:change={args.changeHandler} />
	<CheckRadio
		{...args}
		type="radio"
		id="radio"
		prependLabel
		label="Radio 2"
		on:change={args.changeHandler} />
	<CheckRadio
		{...args}
		type="radio"
		id="radio"
		prependLabel
		label="Radio 3"
		on:change={args.changeHandler} />
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
		disabled
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
