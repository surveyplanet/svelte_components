import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Alert component', () => {
	test('should test a basic info alert', async ({ page }) => {
		const preview = await loadStory(page, 'alert');
		// await expect(page.locator('html')).toHaveClass('htw-dark');
		// page.locator('.histoire-app-header a').nth(2).click();
		// await page.screenshot({ path: 'tests/screenshots/alert.png' });

		expect(preview).toBeDefined();

		const alert = preview.getByRole('alert');
		const closeBtn = alert.getByRole('button');
		const title = alert.getByText('Did you know?');
		const subtitle = alert.getByText('Informational alert');

		await expect(alert).toBeVisible();
		await expect(closeBtn).toBeVisible();
		await expect(title).toBeVisible();
		await expect(subtitle).toBeVisible();

		await expect(alert).toHaveClass(/sp-alert--info/);
		await expect(closeBtn).toHaveClass(/sp-alert--header--close-btn/);
		await expect(title).toHaveClass(/sp-alert--header--title/);
		await expect(subtitle).toHaveClass(/sp-alert--header--subtitle/);
		await closeBtn.click();
		await expect(alert).not.toBeVisible();
	});
	test.only('should test a warning alert', async ({ page }) => {
		const preview = await loadStory(page, 'alert');

		await setControl(page, 'Type', 'select', 'Warning');
		await setControl(page, 'Title', 'text', 'This is a warning...');
		await setControl(page, 'Subtitle', 'text', 'You ');
		await setControl(page, 'Hide delay', 'number', '50');
		await setControl(page, 'Confirm', 'checkbox', 'true');
	});
});
