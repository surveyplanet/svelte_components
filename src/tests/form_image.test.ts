import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Image  component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/image');
		const form = preview.locator('.sp-survey--question--form--image');
		const label1 = form
			.locator('.sp-survey--question--form--image--item')
			.nth(0);
		const label2 = form
			.locator('.sp-survey--question--form--image--item')
			.nth(1);
		const choice1 = label1.locator('input');
		const choice2 = label2.locator('input');
		const image1 = label1.locator('picture');
		const image2 = label2.locator('picture');

		await expect(form).toBeVisible();
		expect(choice1).toBeTruthy();
		expect(choice2).toBeTruthy();
		await expect(image1).toBeVisible();
		await expect(image2).toBeVisible();

		await expect(label1).toHaveText('Image 1');
		await expect(label2).toHaveText('Image 2');

		await label1.click();
		await expect(choice1).toBeChecked();
		await expect(choice2).not.toBeChecked();

		await label2.click();
		await expect(choice2).toBeChecked();
		await expect(choice1).not.toBeChecked();

		const events = await getAllEvents(page);
		expect(events).toHaveLength(2);
		expect(events[0].name).toBe('Event');
		expect(events[0].value).toEqual(
			'[ { "label": "Image 1", "value": "https://media.surveyplanet.com/testing/default" } ]'
		);
		expect(events[0].target).toEqual('input,');

		await expect(image1).toHaveAttribute(
			'style',
			'background-image: url("https://media.surveyplanet.com/w_1000/testing/default.png");'
		);

		const data = [
			{
				image: 'https://media.surveyplanet.com/testing/default/1',
				label: 'Image 1',
			},
			{
				image: 'https://media.surveyplanet.com/testing/no-extension-jpg',
				label: 'Image 2',
			},
		];

		await setControl(page, 'Labels', 'json', JSON.stringify(data));
		await expect(image1).toHaveAttribute(
			'style',
			'background-image: url("https://media.surveyplanet.com/w_1000/testing/default/1.png");'
		);
	});

	test('multiple', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/image');
		const form = preview.locator('.sp-survey--question--form--image');
		const label1 = form
			.locator('.sp-survey--question--form--image--item')
			.nth(0);
		const label2 = form
			.locator('.sp-survey--question--form--image--item')
			.nth(1);
		const choice1 = label1.locator('input');
		const choice2 = label2.locator('input');

		await setControl(page, 'Multi', 'checkbox', 'true');

		await expect(form).toBeVisible();

		await label1.click();
		await expect(choice1).toBeChecked();
		await expect(choice2).not.toBeChecked();

		await label2.click();
		await expect(choice2).toBeChecked();
		await expect(choice1).toBeChecked();
	});

	test('hide caption', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/image');
		const form = preview.locator('.sp-survey--question--form--image');
		const label1 = form
			.locator('.sp-survey--question--form--image--item')
			.nth(0);
		const label2 = form
			.locator('.sp-survey--question--form--image--item')
			.nth(1);

		await expect(form).toBeVisible();

		await setControl(page, 'Hide Captions', 'checkbox', 'true');

		await expect(label1).not.toHaveText('Image 1');
		await expect(label2).not.toHaveText('Image 2');
	});
});
