import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Popover component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'popover');
		const popover = preview.locator('.sp-popover');
		const content = popover.locator('p');
		const changedContent = popover.locator('ul');
		await expect(popover).toBeVisible();
		await expect(content.first()).toBeVisible();
		await expect(content.first()).toContainText(
			'And visit not than sacred cell wins in not childe.'
		);
		// expect(content.count()).toBe(3);
		// cSpell:disable
		await setControl(
			page,
			'Content',
			'text',
			`<ul class:'content-ul'>
				   <li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>
				   <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>
				   <li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>
				   <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li>
			</ul>
	`
		);
		await setControl(page, 'Visible', 'checkbox', 'true');
		await setControl(page, 'Visible', 'checkbox', 'false');
		await expect(popover).not.toBeVisible();
		await setControl(page, 'Visible', 'checkbox', 'true');

		await expect(changedContent).toBeVisible();
		await expect(changedContent).toContainText(
			'tortor neque egestas augue'
		);
	});
});
