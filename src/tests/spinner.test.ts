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

		await expect(spinner).toBeVisible();
		await expect(input).toBeVisible();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();
		await expect(label).toHaveText('Number Spinner');
		await expect(label).toHaveAttribute('for', 'sp-spinner');

		await expect(input).toHaveValue('');

		await input.click();
		const blurEvent = await getLastEvent(page);
		expect(blurEvent.name).toBe('blur');
		await upButton.click();

		await expect(input).toHaveValue('1');
		await upButton.click();
		await expect(input).toHaveValue('2');
		await downButton.click();
		await expect(input).toHaveValue('1');
		await downButton.click();
		await expect(input).toHaveValue('0');
		await downButton.click();
		await expect(input).toHaveValue('0');
		await page.click('body');

		const events = await getAllEvents(page);
		expect(events.length > 0).toBeTruthy();
		const totalChange = events.filter((i) => i.name == 'change').length;
		expect(totalChange).toBe(1);
		const totalBlurEvents = events.filter((i) => i.name == 'blur').length;
		expect(totalBlurEvents).toBe(7);
		const totalFocusEvents = events.filter((i) => i.name == 'focus').length;
		expect(totalFocusEvents).toBe(6);
		const totalUpdateEvents = events.filter(
			(i) => i.name == 'update'
		).length;
		expect(totalUpdateEvents).toBe(4);
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

		await expect(spinner).toBeVisible();
		await expect(input).toBeVisible();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();

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
