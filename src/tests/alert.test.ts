import { test, expect, type FrameLocator } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Alert component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'alert')) as FrameLocator;
	});

	test('basic', async ({ page }) => {
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
		const events = await getAllEvents(page);
		// const closeEvent = events.find((i) => i.name == 'close');
		// expect(closeEvent).toBeTruthy();
		// const openEvent = events.find((i) => i.name == 'open');
		// expect(openEvent).toBeTruthy();
		// const inEvent = events.find((i) => i.name == 'in');
		// expect(inEvent).toBeTruthy();
		// const outEvent = events.find((i) => i.name == 'out');
		// expect(outEvent).toBeTruthy();
	});

	test('success', async ({ page }) => {
		await setControl(page, 'Type', 'select', 'success');
		const alert = canvas.getByRole('alert');
		await expect(alert).toHaveClass(/sp-alert--success/);
	});

	test('warning', async ({ page }) => {
		await setControl(page, 'Type', 'select', 'warning');
		const alert = canvas.getByRole('alert');
		await expect(alert).toHaveClass(/sp-alert--warning/);
	});

	test('error', async ({ page }) => {
		await setControl(page, 'Type', 'select', 'error');
		const alert = canvas.getByRole('alert');
		await expect(alert).toHaveClass(/sp-alert--error/);
	});

	test('confirmation', async ({ page }) => {
		await setControl(page, 'Confirm', 'checkbox', 'true');
		const alert = canvas.getByRole('alert');
		await expect(alert).toBeVisible();
		const confirmButton = canvas.getByRole('button', { name: 'confirm' });
		await expect(confirmButton).toBeVisible();

		await expect(alert).toHaveClass(/sp-alert--confirm/);
		await confirmButton.click();
		await expect(alert).not.toBeVisible();
	});

	test('auto-hide', async ({ page }) => {
		await setControl(page, 'Hide delay', 'number', '2000');
		const alert = canvas.getByRole('alert');
		await expect(alert).toBeVisible();
		await expect(alert).toBeHidden({ timeout: 3000 });
	});

	test('challenge', async ({ page }) => {
		const challengeTxt = 'testing';
		const challengeBtnLabel = 'Yep!';
		const challengeCancelBtnLabel = 'Nope!';
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

	test('html', async ({ page }) => {
		await setControl(
			page,
			'Content',
			'textarea',
			'<a href="#" data-id="test" >Click Me!</a>'
		);

		const alert = canvas.getByRole('alert');
		const link = alert.getByTestId('test');
		await expect(link).toBeVisible();
	});
});
