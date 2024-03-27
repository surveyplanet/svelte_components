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
 * @returns Promise<FrameLocator> the Histoire preview (iframe) or the page if there isn't one.
 */
// export const loadStory = async (
// 	page: Page,
// 	name: string,
// 	variant: number | null = 0
// ): Promise<FrameLocator | Page> => {
// 	const parser: string[] = name.toLocaleLowerCase().split('/');

// 	const componentName = parser.pop();
// 	const path = parser.join('-').replace(/_/g, '-');

// 	let url = '';
// 	if (path.length) {
// 		url = `/story/src-stories-${path}-${componentName}-${componentName}-story-svelte`;
// 	} else {
// 		url = `/story/src-stories-${componentName}-${componentName}-story-svelte`;
// 	}
// 	if (variant !== null && !isNaN(variant)) {
// 		url += `?variantId=src-stories-${componentName}-${componentName}-story-svelte-${variant}`;
// 	}

// 	await page.goto(url);

// 	return page.frameLocator('[data-test-id="preview-iframe"]');
// };

export const loadStory = async (
	page: Page,
	name: string
	// variant: number | null = 0
): Promise<FrameLocator | Page> => {
	const componentName: string = name.toLocaleLowerCase();
	// const componentName = parser.pop();

	const url = `/${componentName}`;

	await page.goto(url);

	return page.locator('id=component-preview--window');
};

/**
 * Retrieve the computes style declarations for a locator element.
 * see [Evaluation Arguments](https://playwright.dev/docs/evaluating#evaluation-argument)
 *
 * @function getStyles
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
\ * @returns Promise<CSSStyleDeclaration> The style value
 */
export const getStyles = (locator: Locator): Promise<CSSStyleDeclaration> => {
	return locator.evaluate((el) => {
		return window.getComputedStyle(el) as CSSStyleDeclaration;
	});
};

/**
 * Retrieve a single computes style for a locator element.
 *
 * @function getStyle
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param property {string} The CSS property for the style to retrieve
 * @returns Promise<string> The style value
 */
export const getStyle = async (
	locator: Locator,
	property: string
): Promise<string> => {
	return locator.evaluate(
		(el, property) =>
			window.getComputedStyle(el).getPropertyValue(property),
		property
	);
};

// const _parseEventData = (dataTxt: string): object => {
// 	if (!dataTxt?.length) {
// 		return {};
// 	}

// 	return Object.fromEntries(
// 		dataTxt
// 			.replace(/^{ /, '')
// 			.replace(/ }$/, '')
// 			.split(', ')
// 			.map((itm) => {
// 				return itm.split(': ');
// 			})
// 	);
// };

/**
 * Retrieve the last event from the Histoire event pane.
 *
 * @function getLastEvent
 * @async
 * @param page {Page} The Playwright page
 * @returns Promise<HistoireEvent> Then event name and data (Does not work with nested objects)
 */

type PropsChangerEvent = {
	name: string;
	value: string;
	target: string;
};
export const getLastEvent = async (page: Page): Promise<PropsChangerEvent> => {
	const eventItem = page.locator('tr.component-event--row').last();
	const hasEventItems = (await eventItem.count()) > 0;

	if (!hasEventItems) {
		return { name: '', value: '', target: '' };
	}

	const eventName = eventItem
		.locator('td.component-event--raw--value')
		.innerText();
	const eventValue = eventItem
		.locator('td.component-event--value--value')
		.innerText();
	const eventTarget = eventItem
		.locator('td.component-event--target--value')
		.innerText();
	const event = {
		name: await eventName,
		value: await eventValue,
		target: await eventTarget,
	};

	return event;
};

/**
 * Retrieve all the events from the Histoire event pane.
 *
 * @function getAllEvents
 * @async
 * @param page {Page} The Playwright page
 * @returns Promise<HistoireEvent[]>
 */
export const getAllEvents = async (
	page: Page
): Promise<PropsChangerEvent[]> => {
	const eventItems = page.locator('tr');
	await expect(eventItems.first()).toBeVisible();
	const totalEvents = await eventItems.count();
	const data: PropsChangerEvent[] = [];
	if (totalEvents <= 1) {
		return data;
	}

	let i = 0;
	let eventItem = page.locator('.component-event--row').nth(i);
	while ((await eventItem.count()) > 0) {
		const eventName = await eventItem
			.locator('td.component-event--raw--value')
			.innerText();
		const eventValue = await eventItem
			.locator('td.component-event--value--value')
			.innerText();
		const eventTarget = await eventItem
			.locator('td.component-event--target--value')
			.innerText();
		data.push({
			name: eventName,
			value: eventValue,
			target: eventTarget,
		});

		i++;
		eventItem = page.locator('tr').nth(i);
	}

	// for (let i = 0; i < totalEvents; i++) {
	// 	const eventItem = eventItems.nth(i);
	// }
	return data;
};

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
	await page.locator('.sp-tab-bar--button').getByText('Controls').click();
	const controls = page.locator('.component-details--content');
	const labelEl = controls.locator('label', {
		has: page.locator(`text="${label}"`),
	});
	// await expect(labelEl).toBeVisible();
	const id = await labelEl.getAttribute('for');

	if (type === 'checkbox') {
		const input = page.locator(`id=${id}`);
		const isChecked = (await input.innerHTML()).valueOf();
		const shouldBeChecked =
			value.toLocaleLowerCase() === 'false' ? false : value.length > 0;
		if (
			(shouldBeChecked && !isChecked) ||
			(!shouldBeChecked && isChecked)
		) {
			await labelEl.click();
		}
	} else if (type === 'json') {
		const input = labelEl.locator('.cm-content');
		// await expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'number') {
		const input = page.locator(`id=${id}`);
		// await expect(numberSpinnerComponent).toBeVisible();
		// const input = numberSpinnerComponent.locator('.sp-dropdown--search');
		await input.click();
		// expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'select') {
		const dropdownComponent = page.locator(`id=${id}`);
		expect(dropdownComponent).toBeVisible();
		const input = dropdownComponent.locator('.sp-dropdown--search');
		await expect(input).toBeVisible();
		await input.click();
		const optionsEl = dropdownComponent.locator('.sp-menu--item');
		// await expect(optionsEl, 'Could not find select values').toBeVisible();
		const optionEl = optionsEl.locator(`text="${value}"`);
		await expect(optionEl).toBeVisible();
		await optionEl.click();
	} else if (type === 'text') {
		const input = page.locator(`id=${id}`);
		await expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'textarea') {
		const input = page.locator(`id=${id}`);
		await expect(input).toBeVisible();
		await input.fill(value);
	}
};
