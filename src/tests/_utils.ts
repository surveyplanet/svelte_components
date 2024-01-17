import {
	expect,
	type FrameLocator,
	type Locator,
	type Page,
} from '@playwright/test';

interface HistoireEvent {
	name: string;
	data?: object;
}

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
export const loadStory = async (
	page: Page,
	name: string,
	variant: number | null = 0
): Promise<FrameLocator | Page> => {
	const parser: string[] = name.toLocaleLowerCase().split('/');

	const componentName = parser.pop();
	const path = parser.join('-').replace(/_/g, '-');

	let url = '';
	if (path.length) {
		url = `/story/src-stories-${path}-${componentName}-${componentName}-story-svelte`;
	} else {
		url = `/story/src-stories-${componentName}-${componentName}-story-svelte`;
	}
	if (variant !== null && !isNaN(variant)) {
		url += `?variantId=src-stories-${componentName}-${componentName}-story-svelte-${variant}`;
	}

	await page.goto(url);

	return page.frameLocator('[data-test-id="preview-iframe"]');
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

const _parseEventData = (dataTxt: string): object => {
	if (!dataTxt?.length) {
		return {};
	}

	return Object.fromEntries(
		dataTxt
			.replace(/^{ /, '')
			.replace(/ }$/, '')
			.split(', ')
			.map((itm) => {
				return itm.split(': ');
			})
	);
};

const _openEventsMenu = async (page: Page, useMenu = false): Promise<void> => {
	const baseMenu = page.locator('.histoire-base-overflow-menu');
	const eventTab = baseMenu.getByText('Events');
	const eventTabVisible = await eventTab.isVisible();
	// console.log('---->', eventTabVisible, await eventTab.count());
	if (eventTabVisible && !useMenu) {
		try {
			await eventTab.click(); // Sometimes this does not work, it's defined as visible even though it's not.
		} catch (error) {
			return _openEventsMenu(page, true);
		}
	} else {
		// open dropdown if menu is truncated
		await baseMenu.getByRole('button').click();
		const optionsEl = page.locator('.v-popper__popper').last();
		await expect(optionsEl, 'Could not find select values').toBeVisible();
		const optionEl = optionsEl.locator(`text="Events"`);
		await expect(optionEl).toBeVisible();
		await optionEl.click();
	}
};

/**
 * Retrieve the last event from the Histoire event pane.
 *
 * @function getLastEvent
 * @async
 * @param page {Page} The Playwright page
 * @returns Promise<HistoireEvent> Then event name and data (Does not work with nested objects)
 */
export const getLastEvent = async (page: Page): Promise<HistoireEvent> => {
	await _openEventsMenu(page);
	const eventItem = page.locator('[data-test-id="event-item"]').last();
	const hasEventItems = (await eventItem.count()) > 0;

	if (!hasEventItems) {
		return { name: '' };
	}

	const eventName = eventItem.locator('span').first();
	const eventData = eventItem.locator('span').last();
	const name = await eventName.innerText();
	const dataTxt = await eventData.innerText();
	const data = _parseEventData(dataTxt);

	return { name, data };
};

/**
 * Retrieve all the events from the Histoire event pane.
 *
 * @function getAllEvents
 * @async
 * @param page {Page} The Playwright page
 * @returns Promise<HistoireEvent[]>
 */
export const getAllEvents = async (page: Page): Promise<HistoireEvent[]> => {
	await _openEventsMenu(page);
	const eventItems = page.locator('[data-test-id="event-item"]');
	const totalEvents = await eventItems.count();
	const data: HistoireEvent[] = [];

	if (totalEvents <= 0) {
		return data;
	}

	for (let i = 0; i < totalEvents; i++) {
		const eventItem = eventItems.nth(i);

		const eventName = eventItem.locator('span').first();
		const eventData = eventItem.locator('span').last();
		const dataTxt = await eventData.innerText();
		data.push({
			name: await eventName.innerText(),
			data: _parseEventData(dataTxt),
		});
	}

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
	await page.locator('.histoire-base-overflow-menu a').nth(0).click();
	const controls = page.locator('[data-test-id="story-controls"]');
	// const labelEl = controls.locator(`:text("${label}") + span`);
	const labelEl = controls.locator('label', {
		has: page.locator(`text="${label}"`),
	});
	await expect(labelEl).toBeVisible();

	if (type === 'button') {
		// TODO:
		throw new Error('setControls is not available for button control.');
	} else if (type === 'buttonGroup') {
		// TODO:
		throw new Error(
			'setControls is not available for buttonGroup control. Use `HST.Select` control instead'
		);
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
		throw new Error(
			'setControls is not available for checkboxList control.'
		);
	} else if (type === 'json') {
		const input = labelEl.locator('.cm-content');
		await expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'number') {
		const input = labelEl.locator('input');
		await expect(input).toBeVisible();
		await input.fill(value);
	} else if (type === 'radio') {
		// TODO:
		throw new Error('setControls is not available for radio control.');
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
		throw new Error('setControls is not available for slider control.');
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
