import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto(
		'http://localhost:6006/?path=/story/badge-default--primary'
	);
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('Badge / Default - Primary ⋅ Storybook');
	// await elementHandle.contentFrame();
	const preview = await page.$('#storybook-preview-iframe');
	const iframe = preview!.contentFrame();
	await expect(iframe).toHaveTitle('badge-default--primary');
});
