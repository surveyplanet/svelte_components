import { test, expect, type FrameLocator } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Alert component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }, testInfo) => {
		canvas = (await loadStory(page, 'alert')) as FrameLocator;
		// console.log(
		// 	`Finished ${testInfo.title} with status ${testInfo.status}`
		// );

		// if (testInfo.status !== testInfo.expectedStatus) {
		// 	console.log(`Did not run as expected, ended up at ${page.url()}`);
		// }
	});

	test('should render a basic info alert dialog', async ({ page }) => {
		// await expect(page.locator('html')).toHaveClass('htw-dark');
		// page.locator('.histoire-app-header a').nth(2).click();
		// await page.screenshot({ path: 'tests/screenshots/alert.png' });

		expect(canvas).toBeDefined();

		const alert = canvas.getByRole('alert');
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

	test('should render a success type', async ({ page }) => {
		// const canvas = await loadStory(page, 'alert');
		await setControl(page, 'Type', 'select', 'Success');
		const alert = canvas.getByRole('alert');
		await expect(alert).toHaveClass(/sp-alert--success/);
	});

	test('should render a warning type', async ({ page }) => {
		// const canvas = await loadStory(page, 'alert');
		await setControl(page, 'Type', 'select', 'Warning');
		const alert = canvas.getByRole('alert');
		await expect(alert).toHaveClass(/sp-alert--warning/);
	});

	test('should render a error type', async ({ page }) => {
		// const canvas = await loadStory(page, 'alert');
		await setControl(page, 'Type', 'select', 'Error');
		const alert = canvas.getByRole('alert');
		await expect(alert).toHaveClass(/sp-alert--error/);
	});

	test('should render a confirmation alert', async ({ page }) => {
		// const canvas = await loadStory(page, 'alert');
		await setControl(page, 'Confirm', 'checkbox', 'true');

		const alert = canvas.getByRole('alert');
		await expect(alert).toBeVisible();
		const confirmButton = canvas.getByRole('button', { name: 'Confirm' });
		await expect(confirmButton).toBeVisible();
		await expect(alert).toHaveClass(/sp-alert--confirm/);
		await confirmButton.click();
		await expect(alert).not.toBeVisible();
	});

	test('should hide the alert after 2 seconds', async ({ page }) => {
		// const canvas = await loadStory(page, 'alert');
		await setControl(page, 'Hide delay', 'number', '2000');

		const alert = canvas.getByRole('alert');
		await expect(alert).toBeVisible();
		await expect(alert).toBeHidden();
	});

	test('should hide the alert after a successfully challenge', async ({
		page,
	}) => {
		const challengeTxt = 'testing';
		const challengeBtnLabel = 'Yep!';
		const challengeCancelBtnLabel = 'Nope!';
		// const canvas = await loadStory(page, 'alert');
		await setControl(page, 'Confirm', 'checkbox', 'true');
		await setControl(page, 'Challenge', 'text', challengeTxt);
		await setControl(
			page,
			'Confirm button label',
			'text',
			challengeBtnLabel
		);
		await setControl(
			page,
			'Cancel button label',
			'text',
			challengeCancelBtnLabel
		);

		const alert = canvas.getByRole('alert');
		const submitButton = canvas.getByRole('button', {
			name: challengeBtnLabel,
		});
		const closeButton = canvas.getByRole('button', {
			name: challengeCancelBtnLabel,
		});
		const challengeInput = canvas.getByRole('textbox');

		await expect(alert).toBeVisible();
		await expect(submitButton).toBeVisible();
		await expect(submitButton).toBeDisabled();
		await expect(closeButton).toBeVisible();
		await expect(challengeInput).toBeVisible();
		await challengeInput.type('incorrect challenge');
		await expect(submitButton).toBeDisabled();
		await challengeInput.fill('');
		await challengeInput.type(challengeTxt);
		await expect(submitButton).not.toBeDisabled();
		await submitButton.click();
		await expect(alert).not.toBeVisible();
	});

	test('should add an html body to the alert', async ({ page }) => {
		// const canvas = await loadStory(page, 'alert');
		await setControl(
			page,
			'Content',
			'textarea',
			'<a href="#" data-testid="test" >Click Me!</a>'
		);

		const alert = canvas.getByRole('alert');
		const link = alert.getByTestId('test');
		await expect(link).toBeVisible();
	});
});
