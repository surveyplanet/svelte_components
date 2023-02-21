<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BUTTON_MODES, SIZES, Button, Icon } from '../../lib';
	import * as tests from './button.test';
	import argTypes from './button_args';
</script>

<Meta
	title="Button/Icon"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button {...args}>Icon Button<Icon name="plus" /></Button>
</Template>

<Story
	name="Default"
	play={tests.iconDefault} />

<Story
	name="Icon left"
	play={tests.iconLeft}>
	<Button><Icon name="plus" />Icon Button</Button>
</Story>

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
	<Button action={true}><Icon name="plus" /></Button>
</Story>

<Story
	name="Small action button"
	play={tests.actionSmall}>
	<Button
		action={true}
		size={SIZES.SMALL}><Icon name="plus" /></Button>
</Story>

<Story
	name="Large action button"
	play={tests.actionLarge}>
	<Button
		action={true}
		size={SIZES.LARGE}><Icon name="plus" /></Button>
</Story>

<Story
	name="Large tertiary round action button"
	play={tests.actionTertiaryRoundLarge}>
	<Button
		action={true}
		round={true}
		mode={BUTTON_MODES.TERTIARY}
		size={SIZES.LARGE}><Icon name="plus" /></Button>
</Story>
