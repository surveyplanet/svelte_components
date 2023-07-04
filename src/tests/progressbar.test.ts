import { test, expect } from '@playwright/test';
import { loadStory, getStyles, setControl } from './_utils.js';

test.describe('Progressbar component', () => {
	test('test for 3 "question"s', async ({ page }) => {
		const preview = await loadStory(page, 'progressbar');
		const progressbar = preview.locator('.sp-progress-bar');
		const progress = preview.locator('.sp-progress-bar--progress');
		const testButton = preview.locator('button');

		await expect(testButton).toBeVisible();

		await expect(progressbar).toBeVisible();
		await expect(progress).not.toBeVisible();

		expect(await getStyles(progress)).toHaveProperty('width', '0px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '240px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '480px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '720px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '0px');
	});

	test.only('test for 10 "question"s', async ({ page }) => {
		const preview = await loadStory(page, 'progressbar');
		const progressbar = preview.locator('.sp-progress-bar');
		const progress = preview.locator('.sp-progress-bar--progress');
		const testButton = preview.locator('button');
		await setControl(
			page,
			'Data',
			'json',
			`
            [
  { "question": "What is your name?", "answer": "John Doe" },
  { "question": "What is your age?", "answer": "21" },
  { "question": "What is your favorite color?", "answer": "Blue" },
  { "question": "What is your favorite food?", "answer": "Pizza" },
  { "question": "What is your favorite drink?", "answer": "Coke" },
  { "question": "What is your favorite animal?", "answer": "Dog" },
  { "question": "What is your favorite movie?", "answer": "Star Wars" },
  { "question": "What is your favorite book?", "answer": "Harry Potter" },
  { "question": "What is your favorite game?", "answer": "Chess" },
  { "question": "What is your favorite sport?", "answer": "Soccer" }
]
            `
		);
		expect(await getStyles(progress)).toHaveProperty('width', '0px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '72px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '144px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '216px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '288px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '360px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '432px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '504px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '576px');

		await testButton.click();

		expect(await getStyles(progress)).toHaveProperty('width', '648px');
	});
});
