import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent, getAllEvents } from './_utils.js';

test.describe('Spinner component', () => {
	test('Number', async ({ page }) => {
		const preview = await loadStory(page, 'spinner');

		const spinner = preview.locator('.sp-spinner');
		const label = preview.locator('.sp-spinner--label');
		const input = spinner.locator('input');
		const upButton = preview.locator('.sp-spinner--button--up');
		const downButton = preview.locator('.sp-spinner--button--down');
		await setControl(page, 'Step', 'number', '1');
		await setControl(page, 'Min', 'number', '0');
		await setControl(page, 'Max', 'number', '10');
		await setControl(page, 'Overflow', 'checkbox', 'false');

		const click = (arr: typeof upButton | typeof downButton) => {
			input.click();
			arr.click();
		};

		await expect(spinner).toBeVisible();
		await expect(input).toBeVisible();
		await expect(upButton).not.toBeVisible();
		await expect(downButton).not.toBeVisible();
		await input.click();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();
		await expect(label).toHaveText('Number Spinner');
		await expect(label).toHaveAttribute('for', 'sp-spinner');

		await expect(input).toHaveValue('');

		await click(upButton);

		await expect(input).toHaveValue('1');
		await click(upButton);
		await expect(input).toHaveValue('2');
		await click(downButton);
		await expect(input).toHaveValue('1');
		await click(downButton);
		await expect(input).toHaveValue('0');
		await click(downButton);
		await expect(input).toHaveValue('0');

		await input.click();
		input.press('5');
		await page.click('body');

		const events = await getAllEvents(page);
		expect(events.length > 0).toBeTruthy();
		const totalChange = events.filter((i) => i.name == 'change').length;
		expect(totalChange).toBe(1);
		// const totalBlurEvents = events.filter((i) => i.name == 'blur').length;
		// expect(totalBlurEvents).toBe(6);
		// const totalFocusEvents = events.filter((i) => i.name == 'focus').length;
		// expect(totalFocusEvents).toBe(4);
		// const totalUpdateEvents = events.filter(
		// 	(i) => i.name == 'update'
		// ).length;
		// expect(totalUpdateEvents).toBe(6);
	});

	test('Float', async ({ page }) => {
		const preview = await loadStory(page, 'spinner');

		await setControl(page, 'Step', 'number', '0.1');
		const spinner = preview.locator('.sp-spinner');
		const input = spinner.locator('input');
		const upButton = preview.locator('.sp-spinner--button--up');
		const downButton = preview.locator('.sp-spinner--button--down');

		await expect(spinner).toBeVisible();
		await expect(input).toBeVisible();
		await input.click();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();

		await expect(input).toHaveValue('');
		await upButton.click();

		await expect(input).toHaveValue('0.1');
		await upButton.click();
		await expect(input).toHaveValue('0.2');
		await downButton.click();
		await expect(input).toHaveValue('0.1');
	});
	test('Number with overflow and step', async ({ page }) => {
		const preview = await loadStory(page, 'spinner');

		await setControl(page, 'Min', 'number', '0');
		await setControl(page, 'Max', 'number', '10');
		await setControl(page, 'Step', 'number', '2');
		await setControl(page, 'Overflow', 'checkbox', 'true');
		const spinner = preview.locator('.sp-spinner');
		const input = spinner.locator('input');
		const upButton = preview.locator('.sp-spinner--button--up');
		const downButton = preview.locator('.sp-spinner--button--down');

		await input.click();

		await expect(input).toHaveValue('');
		await upButton.click();
		await expect(input).toHaveValue('2');
		await upButton.click();
		await expect(input).toHaveValue('4');
		await upButton.click();
		await expect(input).toHaveValue('6');
		await upButton.click();
		await expect(input).toHaveValue('8');
		await upButton.click();
		await expect(input).toHaveValue('10');
		await upButton.click();
		await expect(input).toHaveValue('0');
		await downButton.click();
		await expect(input).toHaveValue('10');
		await downButton.click();
		await expect(input).toHaveValue('8');
		await downButton.click();
		await expect(input).toHaveValue('6');
		await downButton.click();
		await expect(input).toHaveValue('4');
		await downButton.click();
		await expect(input).toHaveValue('2');
	});

	// test.only('Drag', async ({ page }) => {
	// 	const preview = await loadStory(page, 'spinner');
	// 	const spinner = preview.locator('.sp-spinner');
	// 	const input = spinner.locator('input');

	// 	const inputBoundingBox = await input.boundingBox();
	// 	if (!inputBoundingBox) {
	// 		throw new Error('input bounding box not found');
	// 	}
	// 	const inputCenterX = inputBoundingBox.x + inputBoundingBox.width / 3;
	// 	const inputCenterY = inputBoundingBox.y + inputBoundingBox.height / 3;

	// 	await page.mouse.move(inputCenterX, inputCenterY);
	// 	await page.mouse.down();
	// 	await page.mouse.move(inputCenterX, inputCenterY - 100);
	// 	await page.mouse.up();

	// 	await expect(input).toHaveValue('10');
	// });

	test('disabled and required', async ({ page }) => {
		const preview = await loadStory(page, 'spinner');
		const spinner = preview.locator('.sp-spinner');
		const input = spinner.locator('input');
		const required = preview.locator('.sp-spinner--label--required');

		await setControl(page, 'Disabled', 'checkbox', 'true');
		await setControl(page, 'Required', 'checkbox', 'true');
		await expect(input).toBeDisabled();
		await expect(required).toBeVisible();
	});
});
