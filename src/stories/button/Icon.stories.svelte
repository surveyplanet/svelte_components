<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { action } from '@storybook/addon-actions';
	import { BUTTON_MODES, SIZES } from '../../lib/_definitions';
	import Button from '../../lib/Button.svelte';
	import Icon from '../../lib/Icon.svelte';
	import * as tests from './button.test';
	import argTypes from './button_args';
</script>

<Meta
	title="Button/Icon"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button {...args}>Icon Button <Icon name="add" /></Button>
</Template>

<Story
	name="Default"
	play={tests.iconDefault} />

<Story
	name="Dark"
	args={{
		mode: BUTTON_MODES.DARK,
	}}
	play={tests.iconDark} />

<Story
	name="Small"
	args={{
		size: SIZES.SMALL,
	}}
	play={tests.iconSmall} />

<Story
	name="Large"
	args={{
		size: SIZES.LARGE,
	}}
	play={tests.iconLarge} />

<Story
	name="Action button"
	play={tests.action}>
	<Button action={true}><Icon name="add" /></Button>
</Story>

<Story
	name="Small action button"
	play={tests.actionSmall}>
	<Button
		action={true}
		size={SIZES.SMALL}><Icon name="add" /></Button>
</Story>

<Story
	name="Large action button"
	play={tests.actionLarge}>
	<Button
		action={true}
		size={SIZES.LARGE}><Icon name="add" /></Button>
</Story>

<Story
	name="Large tertiary round action button"
	play={tests.actionTertiaryRoundLarge}>
	<Button
		action={true}
		round={true}
		mode={BUTTON_MODES.TERTIARY}
		size={SIZES.LARGE}><Icon name="add" /></Button>
</Story>
