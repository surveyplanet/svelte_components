import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent, getAllEvents } from './_utils.js';

test.describe('Number Spinner component', () => {
	test('Number', async ({ page }) => {
		const preview = await loadStory(page, 'numberspinner');

		const numberspinner = preview.locator('.sp-number-spinner');
		const label = preview.locator('.sp-number-spinner--label');
		const input = numberspinner.locator('input');
		const upButton = preview.locator('.sp-number-spinner--button--up');
		const downButton = preview.locator('.sp-number-spinner--button--down');

		await expect(numberspinner).toBeVisible();
		await expect(input).toBeVisible();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();
		await expect(label).toHaveText('Number Spinner');
		await expect(label).toHaveAttribute('for', 'sp-number-spinner');

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

		const events = await getAllEvents(page);
		expect(events.length > 0).toBeTruthy();
		const totalChange = events.filter((i) => i.name == 'change').length;
		expect(totalChange).toBe(3);
		const totalBlurEvents = events.filter((i) => i.name == 'blur').length;
		expect(totalBlurEvents).toBe(1);
		const totalFocusEvents = events.filter((i) => i.name == 'focus').length;
		expect(totalFocusEvents).toBe(1);
	});
	test('Time', async ({ page }) => {
		const preview = await loadStory(page, 'numberspinner');

		await setControl(page, 'Type', 'select', 'time');
		const numberspinner = preview.locator('.sp-number-spinner');
		const input = numberspinner.locator('input');
		const upButton = preview.locator('.sp-number-spinner--button--up');
		const downButton = preview.locator('.sp-number-spinner--button--down');

		await expect(numberspinner).toBeVisible();
		await expect(input).toBeVisible();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();

		await expect(input).toHaveValue('');
		await upButton.click();

		await expect(input).toHaveValue('00:01');
		await upButton.click();
		await expect(input).toHaveValue('00:02');
		await downButton.click();
		await expect(input).toHaveValue('00:01');
	});
	test('Time with time format change', async ({ page }) => {
		const preview = await loadStory(page, 'numberspinner');
		await setControl(page, 'Type', 'select', 'time');
		await setControl(page, 'Time Format', 'select', '12');
		const numberspinner = preview.locator('.sp-number-spinner');
		const input = numberspinner.locator('input');
		const upButton = preview.locator('.sp-number-spinner--button--up');
		const downButton = preview.locator('.sp-number-spinner--button--down');

		await expect(numberspinner).toBeVisible();
		await expect(input).toBeVisible();
		await expect(upButton).toBeVisible();
		await expect(downButton).toBeVisible();

		await expect(input).toHaveValue('');
		await input.type('12:59');
		await expect(input).toHaveValue('12:59');
		await upButton.click();
		await expect(input).toHaveValue('01:00');
	});

	test('Float', async ({ page }) => {
		const preview = await loadStory(page, 'numberspinner');

		await setControl(page, 'Type', 'select', 'float');
		await setControl(page, 'Step', 'number', '0.1');
		const numberspinner = preview.locator('.sp-number-spinner');
		const input = numberspinner.locator('input');
		const upButton = preview.locator('.sp-number-spinner--button--up');
		const downButton = preview.locator('.sp-number-spinner--button--down');

		await expect(numberspinner).toBeVisible();
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
		const preview = await loadStory(page, 'numberspinner');

		await setControl(page, 'Min', 'number', '0');
		await setControl(page, 'Max', 'number', '10');
		await setControl(page, 'Step', 'number', '2');
		await setControl(page, 'Overflow', 'checkbox', 'true');
		const numberspinner = preview.locator('.sp-number-spinner');
		const input = numberspinner.locator('input');
		const upButton = preview.locator('.sp-number-spinner--button--up');
		const downButton = preview.locator('.sp-number-spinner--button--down');

		await expect(numberspinner).toBeVisible();
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
		const preview = await loadStory(page, 'numberspinner');
		const numberspinner = preview.locator('.sp-number-spinner');
		const input = numberspinner.locator('input');
		const required = preview.locator('.sp-dropdown--label--required');

		await setControl(page, 'Disabled', 'checkbox', 'true');
		await setControl(page, 'Required', 'checkbox', 'true');
		await expect(input).toBeDisabled();
		await expect(required).toBeVisible();
	});
});
