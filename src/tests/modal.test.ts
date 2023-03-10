import { test, expect } from '@playwright/test';
import { getStyles, loadStory, setControl } from './_utils.js';

test.describe('Modal component', () => {
	test('should render basic modal component in Small size', async ({
		page,
	}) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Size', 'select', 'Small');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.getByTestId('modal');
		const title = modal.getByText('Modal');
		const subtitle = modal.getByText('Subtitle');
		const body = modal.getByText('An example paragraph text');

		await expect(modal).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal/);
		await expect(modal).toHaveClass(/sp-modal--small/);

		await expect(modal.getByRole('button')).toHaveClass(
			/sp-modal--header--close-btn/
		);
		await expect(title).toHaveClass(/sp-modal--header--title/);
		await expect(subtitle).toHaveClass(/sp-modal--header--subtitle/);
		await expect(body).toHaveClass(/sp-modal--body/);
		await modal.getByRole('button').click();
		await expect(modal).not.toBeVisible();
	});

	test('should render modal component in Medium size', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Size', 'select', 'Medium');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.getByTestId('modal');

		await expect(modal).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal--medium/);
	});

	test('should render modal component in Large size', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Size', 'select', 'Large');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.getByTestId('modal');

		await expect(modal).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal--large/);
	});

	test('should render modal component in Fullscreen', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Fullscreen', 'checkbox', 'true');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.getByTestId('modal');
		const modalStyles = await getStyles(modal);

		await expect(modal).toBeVisible();
		await expect(modal).toHaveClass(/sp-modal--fullscreen/);
		//TODO: Possibly fix this test to show 100% width and height
		expect(modalStyles).toHaveProperty('width', '720px');
		expect(modalStyles).toHaveProperty('height', '612px');
	});

	test('should render modal component with overlay', async ({ page }) => {
		const preview = await loadStory(page, 'modal');

		await setControl(page, 'Overlay', 'checkbox', 'true');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const modal = preview.getByTestId('modal');
		const overlayBackground = preview.getByTestId('overlay');

		await expect(modal).toBeVisible();
		await expect(overlayBackground).toBeVisible();

		await expect(modal).toHaveClass(/sp-modal--overlay/);
		await expect(overlayBackground).toHaveClass(
			/sp-modal--overlay--background/
		);

		await overlayBackground.click({ position: { x: 0, y: 0 } });

		await expect(modal).not.toBeVisible();
	});
});
