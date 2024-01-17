import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Dropdown component', () => {
	test.skip('with input', async ({ page }) => {
		// working on it's own but sometimes fails on line 26 where it shows there is only 1 item in the menu instead of 7
		const preview = await loadStory(page, 'dropdown');
		const dropdown = preview.locator('.sp-dropdown');
		const input = dropdown.locator('input');
		const label = preview.locator('.sp-dropdown--label');
		await setControl(page, 'Search threshold', 'number', '5');
		const closeBtn = dropdown.locator('.sp-dropdown--close-btn');

		await expect(dropdown).toBeVisible();
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute('type', 'text');
		await expect(label).toHaveText('Dropdown component');
		await expect(label).toHaveAttribute('for', 'sp-dropdown');

		await expect(label).toBeVisible();

		await input.click();
		await expect(preview.locator('menu')).toBeVisible();
		await expect(preview.locator('menu')).toHaveClass(/sp-menu/);
		await expect(preview.locator('.sp-menu--item')).toHaveCount(7);

		await closeBtn.click();

		const changeEvent2 = await getLastEvent(page);
		expect(changeEvent2.name).toBe('change');
		await expect(input).toHaveValue('');
		await input.click();
		await expect(preview.locator('.sp-menu--item')).toHaveCount(7);

		await input.type('ma');
		await expect(preview.locator('.sp-menu--item')).toHaveCount(2);
		await preview.locator('.sp-menu--item').nth(1).click();

		const changeEvent1 = await getLastEvent(page);
		expect(changeEvent1.name).toBe('change');
		await expect(input).toHaveValue('Malayan tiger');
		await input.type(' ');
		await expect(preview.locator('.sp-menu--item').nth(0)).toHaveClass(
			/sp-menu--item--selected/
		);

		await closeBtn.click();

		await input.click();

		await expect(preview.locator('.sp-menu--item')).toHaveCount(7);
		await expect(preview.locator('.sp-menu--item').nth(0)).not.toHaveClass(
			/sp-menu--item--selected/
		);
		await expect(preview.locator('.sp-menu--item').nth(1)).not.toHaveClass(
			/sp-menu--item--selected/
		);
		await expect(preview.locator('.sp-menu--item').nth(2)).not.toHaveClass(
			/sp-menu--item--selected/
		);
		await expect(preview.locator('.sp-menu--item').nth(3)).not.toHaveClass(
			/sp-menu--item--selected/
		);
		await expect(preview.locator('.sp-menu--item').nth(4)).not.toHaveClass(
			/sp-menu--item--selected/
		);
		await expect(preview.locator('.sp-menu--item').nth(5)).not.toHaveClass(
			/sp-menu--item--selected/
		);
		await expect(preview.locator('.sp-menu--item').nth(6)).not.toHaveClass(
			/sp-menu--item--selected/
		);

		await preview.locator('body').click();
		await expect(preview.locator('menu')).not.toBeVisible();
	});

	test.skip('without input', async ({ page }) => {
		// working on it's own but sometimes fails on line 107 where it can't find the class sp-menu--item--selected
		const preview = await loadStory(page, 'dropdown');
		const toggleBtn = preview.locator('.sp-dropdown--toggle-btn');
		const dropdown = preview.locator('.sp-dropdown');
		const input = dropdown.locator('input');

		await setControl(page, 'Search threshold', 'number', '10');

		await expect(dropdown).toBeVisible();
		await expect(toggleBtn).toBeVisible();

		await toggleBtn.click();
		await expect(preview.locator('menu')).toBeVisible();
		await expect(preview.locator('menu')).toHaveClass(/sp-menu/);
		await expect(preview.locator('.sp-menu--item')).toHaveCount(7);

		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');
		await expect(input).toHaveValue('Bengal tiger');

		await input.click();

		await expect(preview.locator('.sp-menu--item').nth(0)).toHaveClass(
			/sp-menu--item--selected/
		);

		await input.click();
		await expect(preview.locator('menu')).not.toBeVisible();
	});

	test('disabled', async ({ page }) => {
		const preview = await loadStory(page, 'dropdown');
		await setControl(page, 'Disabled', 'checkbox', 'true');
		const dropdown = preview.locator('.sp-dropdown');
		const input = dropdown.locator('.sp-dropdown--search');

		await expect(input).toBeDisabled();
	});
	test('required', async ({ page }) => {
		const preview = await loadStory(page, 'dropdown');
		await setControl(page, 'Required', 'checkbox', 'true');
		const label = preview.locator('.sp-dropdown--label');
		const requiredStar = label.locator('.sp-dropdown--label--required');

		await expect(requiredStar).toBeVisible();
	});
});
