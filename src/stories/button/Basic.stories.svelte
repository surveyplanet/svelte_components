<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { action } from '@storybook/addon-actions';
	import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
	import Button from '../../lib/Button.svelte';
	import * as tests from './button.test';
	import argTypes from './button_args';
	import { getNodeText } from '@storybook/testing-library';
	import { expect } from '@storybook/jest';
	import { delay } from '../../lib/_utils';

	// const clickEventHandler = (e) => {
	// 	return action('clickEvent')(e);
	// };
</script>

<Meta
	title="Button/Basic"
	component={Button}
	{argTypes} />

<Template let:args>
	<Button
		{...args}
		on:clickEvent={args.clickHandler}>Button</Button>
</Template>

<Story
	name="Primary"
	let:args
	play={tests.primary} />

<Story
	name="Secondary"
	args={{ mode: BUTTON_MODES.SECONDARY }}
	play={tests.secondary} />

<Story
	name="Tertiary"
	args={{ mode: BUTTON_MODES.TERTIARY }}
	play={tests.tertiary} />

<Story
	name="Quaternary"
	args={{ mode: BUTTON_MODES.QUATERNARY }}
	play={tests.quaternary} />

<Story
	name="Dark"
	args={{ mode: BUTTON_MODES.DARK }}
	play={tests.dark} />

<Story
	name="Light"
	args={{ mode: BUTTON_MODES.LIGHT }}
	play={tests.light} />

<Story
	name="Round"
	args={{ round: true }}
	play={tests.rounded} />

<Story
	name="Block"
	play={tests.block}>
	<Button
		block={true}
		size={BUTTON_SIZES.LARGE}>
		Button should take up all available horizontal space.
	</Button>
</Story>

<Story
	name="Empty"
	play={tests.empty}>
	<Button />
</Story>
