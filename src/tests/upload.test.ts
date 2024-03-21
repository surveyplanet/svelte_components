import { test, expect } from '@playwright/test';
import { loadStory } from './_utils.js';
import { delay } from '@surveyplanet/utilities';

test.describe('ImageUpload component', () => {
	test('basic', async ({ page }) => {
		delay(100000);
		const preview = await loadStory(page, 'upload');
		const label = preview.locator('.sp-form-control');
		const imageupload = label.locator('.sp-image-upload--preview');
		const input = label.locator('.sp-image-upload--input');
		let img = imageupload.locator('img');

		await expect(label).toHaveClass('sp-form-control sp-image-upload');

		await expect(imageupload).toBeVisible();

		await expect(input).toHaveAttribute('type', 'file');

		await label.click();

		await page.setInputFiles(
			'.sp-image-upload--input',
			'src/tests/assets/1.jpg'
		);

		await page.waitForTimeout(100);

		await expect(img).toHaveAttribute(
			'src',
			'https://media.surveyplanet.com/w_100,h_100/testing/default'
		);
	});
});
