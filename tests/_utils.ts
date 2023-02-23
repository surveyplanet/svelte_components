import {
	expect,
	type FrameLocator,
	type Page,
	type Locator,
} from '@playwright/test';

export const loadStory = async (
	page: Page,
	name: string,
	variant: number | null = 0
): FrameLocator => {
	let url = `/story/src-historie-${name}-${name}-story-svelte`;
	if (!Number.isNaN(variant)) {
		url += `?variantId=src-historie-${name}-${name}-story-svelte-${variant}`;
	}
	await page.goto(url);
	return page.
	('[data-test-id="preview-iframe"]');
};

type ControlType =
	| 'button'
	| 'buttonGroup'
	| 'checkbox'
	| 'checkboxList'
	| 'json'
	| 'number'
	| 'radio'
	| 'select'
	| 'slider'
	| 'text'
	| 'textarea'
	| 'textarea';

export const setControl = async (
	page: Page,
	label: string,
	type: ControlType,
	value: string
): Promise<void> => {
	// click the controls tab
	await page.locator('.histoire-base-overflow-menu a').nth(0).click();
	const controls = page.locator('[data-test-id="story-controls"]');
	// const labelEl = controls.locator(`:text("${label}") + span`);
	const labelEl = controls.locator('label', {
		has: page.locator(`text="${label}"`),
	});

	// await labelEl.click(); // <-- click the label to give it some focus

	if (type === 'button') {
		// TODO:
		throw new Error('setControls is not available for button yet.');
	} else if (type === 'buttonGroup') {
		// TODO:
		throw new Error('setControls is not available for buttonGroup yet.');
	} else if (type === 'checkbox') {
		const input = labelEl.locator('.histoire-simple-checkbox');
		const svg = input.locator('svg path');
		const svgStrokeAttr = await svg.getAttribute('stroke-dashoffset');
		const isChecked = svgStrokeAttr === '0';
		const shouldBeChecked =
			value.toLocaleLowerCase() === 'false' ? false : value.length > 0;
		if (
			(shouldBeChecked && !isChecked) ||
			(!shouldBeChecked && isChecked)
		) {
			await labelEl.click();
		}
	} else if (type === 'checkboxList') {
		// TODO:
		throw new Error('setControls is not available for checkboxList yet.');
	} else if (type === 'json') {
		// TODO:
		throw new Error('setControls is not available for json yet.');
	} else if (type === 'number') {
		const input = labelEl.locator('input');
		await expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'radio') {
		// TODO:
		throw new Error('setControls is not available for radio yet.');
	} else if (type === 'select') {
		const trigger = labelEl.locator('.v-popper');
		await expect(trigger).toBeVisible();
		await trigger.dblclick();
		const optionsEl = page.locator('.v-popper__popper').last();
		await expect(optionsEl, 'Could not find select values').toBeVisible();
		const optionEl = optionsEl.locator(`text="${value}"`);
		await expect(optionEl).toBeVisible();
		await optionEl.click();
	} else if (type === 'slider') {
		// TODO:
		throw new Error('setControls is not available for slider yet.');
	} else if (type === 'text') {
		const input = labelEl.locator('input');
		await expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'textarea') {
		// TODO:
		throw new Error('setControls is not available for textarea yet.');
	}
};
