<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import argTypes from './button_args';
	import Button from '../../lib/Button.svelte';
	import Icon from '../../lib/Icon.svelte';
	import * as tests from './button.test';
</script>

<Meta
	title="Button/Disabled"
	component={Button}
	argTypes={{
		...argTypes,
		disabled: { control: 'boolean', defaultValue: true },
	}} />

<Template let:args>
	<Button
		{...args}
		disabled={true}>
		Disabled Button <Icon name="add" />
	</Button>
</Template>

<Story
	name="Disabled Primary"
	play={tests.defaultDisabled} />

<Story
	name="Disabled Secondary"
	args={{ mode: BUTTON_MODES.SECONDARY }}
	play={tests.secondaryDisabled} />

<Story
	name="Disabled Tertiary"
	args={{ mode: BUTTON_MODES.TERTIARY }}
	play={tests.tertiaryDisabled} />

<Story
	name="Disabled Quaternary"
	args={{ mode: BUTTON_MODES.QUATERNARY }}
	play={tests.quaternaryDisabled} />

<Story
	name="Disabled Dark"
	args={{ mode: BUTTON_MODES.DARK }}
	play={tests.darkDisabled} />

<Story
	name="Disabled Light"
	args={{ mode: BUTTON_MODES.LIGHT }}
	play={tests.lightDisabled} />
