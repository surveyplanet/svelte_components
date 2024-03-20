import { test, expect } from '@playwright/test';
import { getStyles, loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Modal component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'modal');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.locator('.sp-modal');
		const title = modal.getByText('Modal');
		const subtitle = modal.getByText('Subtitle');
		const body = modal.getByText('And visit not');
		const closeBtn = modal.getByRole('button');

		await expect(modal).toBeVisible();
		await expect(title).toBeVisible();
		await expect(subtitle).toBeVisible();
		await expect(body).toBeVisible();
		await expect(closeBtn).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal/);
		await expect(modal).toHaveClass(/sp-modal--medium/);

		await expect(closeBtn).toHaveClass(/sp-modal--header--close-btn/);
		await expect(title).toHaveClass(/sp-modal--header--title/);
		await expect(subtitle).toHaveClass(/sp-modal--header--subtitle/);
		await expect(body).toHaveClass(/sp-modal--body/);
		await closeBtn.click();
		await expect(modal).not.toBeVisible();
	});

	test('small', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Size', 'select', 'small');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.locator('.sp-modal');

		await expect(modal).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal--small/);
	});

	test('large', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Size', 'select', 'large');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.locator('.sp-modal');

		await expect(modal).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal--large/);
	});

	test('fullscreen', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Fullscreen', 'checkbox', 'true');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.locator('.sp-modal');
		const modalStyles = await getStyles(modal);

		await expect(modal).toBeVisible();
		await expect(modal).toHaveClass(/sp-modal--fullscreen/);
		//TODO: Possibly fix this test to show 100% width and height
		expect(modalStyles).toHaveProperty('width', '1280px');
		expect(modalStyles).toHaveProperty('height', '720px');
	});

	test('overlay', async ({ page }) => {
		const preview = await loadStory(page, 'modal');
		const launchBtn = preview.locator('.sp-button');

		// await setControl(page, 'Overlay', 'checkbox', 'true');
		await launchBtn.click();

		const modal = preview.locator('.sp-modal');
		const overlayBackground = preview.locator('.sp-modal--overlay');

		await expect(modal).toBeVisible();
		await expect(overlayBackground).toBeVisible();
		await expect(overlayBackground).toHaveClass(/sp-modal--overlay/);
		await overlayBackground.click({ position: { x: 0, y: 0 } });
		await expect(modal).not.toBeVisible();
		// for some reason it is failing when test:dev but not in debug mode for 'in' and 'close' events
		const events = await getAllEvents(page);
		// const openEvent = events.find((i) => i.name == 'open');
		// expect(openEvent).toBeTruthy();
		// const inEvent = events.find((i) => i.name == 'in');
		// expect(inEvent).toBeTruthy();
		// const closeEvent = events.find((i) => i.name == 'close');
		// expect(closeEvent).toBeTruthy();
		// const outEvent = events.find((i) => i.name == 'out');
		// expect(outEvent).toBeTruthy();
	});
});
