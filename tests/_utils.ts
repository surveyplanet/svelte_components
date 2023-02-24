import {
	expect,
	type FrameLocator,
	type Locator,
	type Page,
} from '@playwright/test';

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
	| 'textarea';

/**
 * Navigate to a component's story.
 *
 * @function loadStory
 * @async
 * @param page {Page} Playwright Page object
 * @param name {String} The name of the component
 * @param variant {Number} The story variant index
 * @returns Promise<FrameLocator>
 */
export const loadStory = async (
	page: Page,
	name: string,
	variant: number | null = 0
): Promise<FrameLocator> => {
	name = name.toLocaleLowerCase();
	let url = `/story/src-historie-${name}-${name}-story-svelte`;
	if (variant && !isNaN(variant)) {
		url += `?variantId=src-historie-${name}-${name}-story-svelte-${variant}`;
	}
	await page.goto(url);
	return page.frameLocator('[data-test-id="preview-iframe"]');
};

/**
 * Retrieve the computes style of a locator element.
 * THIS DOES NOT WORK, SEE: https://github.com/microsoft/playwright/issues/4282#issuecomment-1444548056
 * Also see [Evaluation Arguments](https://playwright.dev/docs/evaluating#evaluation-argument)
 *
 * @function geStyle
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param property {String} The css property name e.g.: 'background-color' | 'text-transform'
 * @returns Promise<String> The style value
 */
// export const getStyle = async (
// 	locator: Locator,
// 	property: string
// ): Promise<string> => {
// 	return await locator.evaluate((el) => {
// 		return window.getComputedStyle(el).getPropertyValue(property);
// 	});
// };
//
// export const getStyle = async (
// 	locator: Locator,
// 	property: string
// ): Promise<string> => {
// 	return await locator.evaluate(
// 		(args) => {
// 			return window.getComputedStyle(args.el).getPropertyValue(args.prop);
// 		},
// 		{ el: locator, prop: property }
// 	);
// };

/**
 * Set Histoire control values. NOTE: some controls don't work and need to be flushed out still
 *
 * @function setControl
 * @async
 * @param page {Page} Playwright Page object
 * @param label {String} The control label (case sensitive)
 * @param type {ControlType} The type of control
 * @param value {String} The new value to set.
 * @returns Promise<void>
 */
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
		const input = labelEl.locator('textarea');
		await expect(input).toBeVisible();
		await input.fill(value);
	}
};