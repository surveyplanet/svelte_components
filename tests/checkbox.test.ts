import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Checkbox component', () => {
	test('should render basic checkbox component', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const value = 'Checkbox';
		const checkbox = preview.getByLabel(value);

		// await setControl(page, 'Name', 'text', 'checkbox');
		// await setControl(page, 'Label', 'text', value);
		// await setControl(page, 'Value', 'text', 'checkbox');
		// await setControl(page, 'Id', 'text', 'checkbox');

		expect(checkbox).toBeTruthy();

		await page.getByLabel('checkbox').check();

		await expect(checkbox).toBeChecked();
		// expect(bgColor).toBe('rgb(255, 233, 120)');
		// expect(labelColor).toBe('rgb(22, 33, 55)');
		// expect(textTransform).toBe('uppercase');
		// expect(textOverflow).toBe('ellipsis');
		// expect(overflow).toBe('hidden');
	});
});
