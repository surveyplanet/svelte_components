<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, Button, Icon } from '../../lib';
	import argTypes from './button_args';
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
	name="Primary"
	play={tests.defaultDisabled} />

<Story
	name="Secondary"
	args={{ mode: BUTTON_MODES.SECONDARY }}
	play={tests.secondaryDisabled} />

<Story
	name="Tertiary"
	args={{ mode: BUTTON_MODES.TERTIARY }}
	play={tests.tertiaryDisabled} />

<Story
	name="Quaternary"
	args={{ mode: BUTTON_MODES.QUATERNARY }}
	play={tests.quaternaryDisabled} />

<Story
	name="Dark"
	args={{ mode: BUTTON_MODES.DARK }}
	play={tests.darkDisabled} />

<Story
	name="Light"
	args={{ mode: BUTTON_MODES.LIGHT }}
	play={tests.lightDisabled} />
