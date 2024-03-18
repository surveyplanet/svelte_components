import { test, expect } from '@playwright/test';
import { loadStory } from './_utils.js';
import { delay } from '@surveyplanet/utilities';

test.describe('ImageUpload component', () => {
	test('basic', async ({ page }) => {
		delay(100000);
		const preview = await loadStory(page, 'upload');
		const imageupload = preview.locator('.sp-image-upload');
		const input = preview.locator('.sp-image-upload-input"');

		await expect(imageupload).toBeVisible();

		await expect(input).toHaveAttribute('type', 'file');

		// await imageupload.click();

		await page.setInputFiles(
			'.sp-image-upload-input',
			'src/tests/assets/1.jpg'
		);
	});
});
