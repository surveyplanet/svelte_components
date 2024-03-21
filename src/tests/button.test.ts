import { test, expect, type Page, type FrameLocator } from '@playwright/test';
import { setControl, getStyles, getLastEvent, loadStory } from './_utils.js';
import { delay } from '@surveyplanet/utilities';

let canvas: FrameLocator;
test.beforeEach(async ({ page }) => {
	canvas = (await loadStory(page, 'button')) as FrameLocator;
});

test.describe('Button component', () => {
	test('basic', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();
		const styles = await getStyles(btn);
		const btnRect = await btn.boundingBox();
		// const ripple = btn.locator('.sp-button--ripple');

		await expect(btn).toHaveClass(/sp-button/);
		await expect(btn).toHaveClass(/sp-button--primary/);
		await expect(btn).toHaveClass(/sp-button--medium/);
		await expect(btn).not.toHaveClass(/sp-button--active/);
		expect(await btn.innerText()).toBe('Submit');
		expect(styles.backgroundColor).toBe('rgb(25, 31, 41)');
		expect(styles.borderRadius).toBe('5px');
		expect(styles.color).toBe('rgb(255, 255, 255)');

		// test hover effect
		// const hoverPseudoStyle = await btn.evaluate((el) => {
		// 	return window.getComputedStyle(el, ':before');
		// });

		// const hoverPseudoWidth = Number(
		// 	hoverPseudoStyle.width.replace('px', '')
		// );
		// const hoverPseudoHeight = Number(
		// 	hoverPseudoStyle.height.replace('px', '')
		// );
		// expect(hoverPseudoStyle.opacity).toBe('1');
		// // expect(hoverPseudoWidth).toBeGreaterThan(btnRect!.width);
		// expect(hoverPseudoHeight).toBe(btnRect!.height);
		// expect(hoverPseudoStyle.transform).toMatch(
		// 	// /^matrix\(1, 0, 0, 1, -?[0-9]{1-3}(.[0-9]{1-2})?, 0\)/
		// 	/^matrix\(1, 0, 0, 1, -.*/
		// );

		// test ripple effect
		await page.mouse.move(
			btnRect!.x + btnRect!.width * 0.5,
			btnRect!.y + btnRect!.height * 0.5
		);

		await page.mouse.down();
		// await expect(ripple).not.toBeVisible();

		// await expect(ripple).toBeVisible();
		await page.mouse.up();
		// expect(ripple).not.toBeVisible();

		const event = await getLastEvent(page);
		expect(event).toEqual({
			event: '{ "value": "undefined", "target": "span, sp-button--label", "event": "{\\"isTrusted\\":true,\\"__root\\":{}}" }',
		});
		// expect(event.data?.detail).toBe('[object Object]');
	});

	test('light', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'light');

		await expect(btn).toHaveClass(/sp-button--light/);
		let styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(247, 245, 238)');
		// expect(styles.boxShadow).toBe(
		// 	'rgb(220, 222, 225) 0px 0px 0px 1px inset'
		// );

		await btn.hover();
		styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(235, 230, 215)');
	});

	test('accent', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'accent');

		await expect(btn).toHaveClass(/sp-button--accent/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(255, 240, 163)');
	});

	test('accent alt 1', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'accent-alt1');

		await expect(btn).toHaveClass(/sp-button--accent-alt1/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(191, 237, 253)');
	});

	test('accent alt 2', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'accent-alt2');

		await expect(btn).toHaveClass(/sp-button--accent-alt2/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(189, 255, 216)');
	});

	test('accent alt 3', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'accent-alt3');

		await expect(btn).toHaveClass(/sp-button--accent-alt3/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(253, 206, 213)');
	});

	test('outline', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'outline');

		await expect(btn).toHaveClass(/sp-button--outline/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
	});

	test('rounded', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Round', 'checkbox', 'true');

		await expect(btn).toHaveClass(/sp-button--round/);
		const styles = await getStyles(btn);
		expect(styles.borderRadius).toBe('32px');
	});

	test('block', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();

		await setControl(page, 'Block', 'checkbox', 'true');

		await expect(btn).toHaveClass(/sp-button--block/);
		// const paddingSize = 35; // padding is approximately 35px
		// expect(btn.offsetWidth).toBeGreaterThan(
		// 	global.innerWidth - paddingSize
		// );
	});

	test('disabled', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Disabled', 'checkbox', 'true');

		const styles = await getStyles(btn);
		// const iconStyles = await getStyles(icon);

		await expect(btn).toBeDisabled();
		expect(styles.backgroundColor).toBe('rgb(235, 230, 215)');
		// expect(styles.color).toBe('rgb(143, 141, 130)');
		// expect(iconStyles.stroke).toBe(styles.color);
	});

	// test('disabled secondary', async ({ page }) => {
	// 	await loadButtonPage(page, 2);
	// 	const btn = page.getByTestId('icon');
	// 	await expect(btn).toBeVisible();
	// 	const icon = btn.locator('svg path');
	// 	await expect(icon).toBeVisible();

	// 	await setControl(page, 'Disabled', 'checkbox', 'true');
	// 	await setControl(page, 'Mode', 'select', 'secondary');
	// 	const styles = await getStyles(btn);
	// 	const iconStyles = await getStyles(icon);

	// 	await expect(btn).toBeDisabled();
	// 	await expect(btn).toHaveClass(/sp-button--secondary/);
	// 	expect(styles.backgroundColor).toBe('rgb(255, 245, 188)');
	// 	expect(styles.color).toBe('rgb(250, 199, 102)');
	// 	expect(iconStyles.stroke).toBe(styles.color);
	// });

	// test('disabled tertiary', async ({ page }) => {
	// 	await loadButtonPage(page, 2);
	// 	const btn = page.getByTestId('icon');
	// 	await expect(btn).toBeVisible();
	// 	const icon = btn.locator('svg path');
	// 	await expect(icon).toBeVisible();

	// 	await setControl(page, 'Disabled', 'checkbox', 'true');
	// 	await setControl(page, 'Mode', 'select', 'tertiary');
	// 	const styles = await getStyles(btn);
	// 	const iconStyles = await getStyles(icon);

	// 	await expect(btn).toBeDisabled();
	// 	await expect(btn).toHaveClass(/sp-button--tertiary/);
	// 	expect(styles.backgroundColor).toBe('rgb(217, 254, 219)');
	// 	expect(styles.color).toBe('rgb(123, 228, 146)');
	// 	expect(iconStyles.stroke).toBe(styles.color);
	// });

	// test('disabled quaternary', async ({ page }) => {
	// 	await loadButtonPage(page, 2);
	// 	const btn = page.getByTestId('icon');
	// 	await expect(btn).toBeVisible();
	// 	const icon = btn.locator('svg path');
	// 	await expect(icon).toBeVisible();

	// 	await setControl(page, 'Disabled', 'checkbox', 'true');
	// 	await setControl(page, 'Mode', 'select', 'quaternary');
	// 	const styles = await getStyles(btn);
	// 	const iconStyles = await getStyles(icon);

	// 	await expect(btn).toBeDisabled();
	// 	await expect(btn).toHaveClass(/sp-button--quaternary/);
	// 	expect(styles.backgroundColor).toBe('rgb(216, 244, 253)');
	// 	expect(styles.color).toBe('rgb(120, 196, 238)');
	// 	expect(iconStyles.stroke).toBe(styles.color);
	// });

	// test('disabled dark', async ({ page }) => {
	// 	await loadButtonPage(page, 2);
	// 	const btn = page.getByTestId('icon');
	// 	await expect(btn).toBeVisible();
	// 	const icon = btn.locator('svg path');
	// 	await expect(icon).toBeVisible();

	// 	await setControl(page, 'Disabled', 'checkbox', 'true');
	// 	await setControl(page, 'Mode', 'select', 'dark');
	// 	const styles = await getStyles(btn);
	// 	const iconStyles = await getStyles(icon);

	// 	await expect(btn).toBeDisabled();
	// 	await expect(btn).toHaveClass(/sp-button--dark/);
	// 	expect(styles.backgroundColor).toBe('rgb(220, 222, 225)');
	// 	expect(styles.color).toBe('rgb(115, 122, 135)');
	// 	expect(iconStyles.stroke).toBe(styles.color);
	// });

	// test('disabled light', async ({ page }) => {
	// 	await loadButtonPage(page, 2);
	// 	const btn = page.getByTestId('icon');
	// 	await expect(btn).toBeVisible();
	// 	const icon = btn.locator('svg path');
	// 	await expect(icon).toBeVisible();

	// 	await setControl(page, 'Disabled', 'checkbox', 'true');
	// 	await setControl(page, 'Mode', 'select', 'light');
	// 	const styles = await getStyles(btn);
	// 	const iconStyles = await getStyles(icon);

	// 	await expect(btn).toBeDisabled();
	// 	await expect(btn).toHaveClass(/sp-button--light/);
	// 	expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
	// 	expect(styles.color).toBe('rgb(220, 222, 225)');
	// 	expect(iconStyles.stroke).toBe(styles.color);
	// });

	test('icon button', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		const icon = btn.locator('svg');
		const iconPath = btn.locator('svg path');
		await expect(icon).toBeVisible();

		const btnStyles = await getStyles(btn);
		const iconStyles = await getStyles(iconPath);

		expect(btnStyles.backgroundColor).toBe('rgb(25, 31, 41)');
		expect(btnStyles.color).toBe('rgb(255, 255, 255)');

		await expect(icon).toHaveAttribute('width', '20');
		await expect(icon).toHaveAttribute('height', '20');
		// expect(iconStyles.stroke).toBe(btnStyles.color);
	});

	// test('icon button dark', async ({ page }) => {
	// 	await loadButtonPage(page, 2);
	// 	const btn = page.getByTestId('icon');
	// 	const icon = btn.locator('svg');
	// 	const iconPath = btn.locator('svg path');
	// 	await expect(icon).toBeVisible();

	// 	await setControl(page, 'Mode', 'select', 'dark');

	// 	const bBox = await icon.boundingBox();
	// 	const btnStyles = await getStyles(btn);
	// 	const iconStyles = await getStyles(iconPath);

	// 	expect(btnStyles.backgroundColor).toBe('rgb(22, 33, 55)');
	// 	expect(btnStyles.color).toBe('rgb(220, 222, 225)');
	// 	expect(bBox!.width).toBe(20);
	// 	expect(bBox!.height).toBe(20);
	// 	expect(iconStyles.stroke).toBe(btnStyles.color);
	// });

	test('icon small', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		const icon = btn.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', 'small');

		const bBox = await icon.boundingBox();

		expect(bBox!.width).toBe(20);
		expect(bBox!.height).toBe(20);
	});

	test('icon large', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		const icon = btn.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', 'large');

		const bBox = await icon.boundingBox();

		expect(bBox!.width).toBe(20);
		expect(bBox!.height).toBe(20);
	});

	test('floating action button', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		await setControl(page, 'Action', 'checkbox', 'true');
		await setControl(page, 'Content', 'text', ' ');
		const icon = btn.locator('svg');
		expect(btn).toBeVisible();
		await expect(icon).toBeVisible();

		const btnRect = await btn.boundingBox();
		expect(btnRect!.width).toBe(32);
		expect(btnRect!.height).toBe(32);

		const iconRect = await icon.boundingBox();
		expect(iconRect!.width).toBe(20);
		expect(iconRect!.height).toBe(20);
	});

	test('floating action button - small ', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		await setControl(page, 'Action', 'checkbox', 'true');
		await setControl(page, 'Content', 'text', ' ');
		expect(btn).toBeVisible();
		const icon = btn.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', 'small');

		const btnRect = await btn.boundingBox();
		expect(btnRect!.width).toBe(24);
		expect(btnRect!.height).toBe(24);

		const iconRect = await icon.boundingBox();
		expect(iconRect!.width).toBe(20);
		expect(iconRect!.height).toBe(20);
	});

	test('floating action button - large ', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		await setControl(page, 'Action', 'checkbox', 'true');
		await setControl(page, 'Content', 'text', ' ');
		expect(btn).toBeVisible();
		const icon = btn.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', 'large');

		const btnRect = await btn.boundingBox();
		expect(btnRect!.width).toBe(48);
		expect(btnRect!.height).toBe(48);

		const iconRect = await icon.boundingBox();
		expect(iconRect!.width).toBe(20);
		expect(iconRect!.height).toBe(20);
	});

	test('floating action button - large and round', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		await setControl(page, 'Action', 'checkbox', 'true');
		await setControl(page, 'Content', 'text', ' ');
		expect(btn).toBeVisible();
		const icon = btn.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', 'large');
		await setControl(page, 'Round', 'checkbox', 'true');

		const styles = await getStyles(btn);
		const btnRect = await btn.boundingBox();
		expect(btnRect!.width).toBe(48);
		expect(btnRect!.height).toBe(48);

		const iconRect = await icon.boundingBox();
		expect(iconRect!.width).toBe(20);
		expect(iconRect!.height).toBe(20);
		expect(styles.borderRadius).toBe('32px');
	});

	test('loader', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Loader', 'checkbox', 'true');
		await expect(btn).toBeVisible();
		await expect(btn).toHaveClass(/sp-button--loader/);

		const btnLabel = btn.locator('.sp-button--label');
		const styles = await getStyles(btn);

		const afterEl = await btn.evaluate((el) => {
			return window.getComputedStyle(el, ':after');
		});

		// await expect(btnLabel).not.toBeVisible();
		expect(styles.backgroundColor).toBe('rgb(25, 31, 41)');
		// await expect(btn.innerText).toBe('');
		expect(afterEl.display).toBe('none');
		expect(afterEl.width).toBe('16px');
		expect(afterEl.height).toBe(afterEl.width);
		expect(afterEl.borderRadius).toBe('100%');
		expect(afterEl.animationDuration).toBe('1s');
		expect(afterEl.animationTimingFunction).toBe('linear');
		expect(afterEl.animationIterationCount).toBe('infinite');
		expect(afterEl.borderBottom).toBe('2px solid rgb(255, 255, 255)');
		expect(afterEl.borderTop).toBe('2px solid rgba(0, 0, 0, 0)');
	});

	test('loader large', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Disabled', 'checkbox', 'true');
		await setControl(page, 'Loader', 'checkbox', 'true');

		await expect(btn).toBeVisible();

		await setControl(page, 'Size', 'select', 'large');

		const afterEl = await btn.evaluate((el) => {
			return window.getComputedStyle(el, ':after');
		});

		await expect(btn).toHaveClass(/sp-button--loader/);
		await expect(btn).toHaveClass(/sp-button--large/);
		expect(afterEl.display).toBe('block');
		expect(afterEl.width).toBe('18px');
		expect(afterEl.height).toBe(afterEl.width);
	});

	test('loader small', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Loader', 'checkbox', 'true');
		await setControl(page, 'Disabled', 'checkbox', 'true');

		await expect(btn).toBeVisible();

		await setControl(page, 'Size', 'select', 'small');

		const afterEl = await btn.evaluate((el) => {
			return window.getComputedStyle(el, ':after');
		});

		await expect(btn).toHaveClass(/sp-button--loader/);
		await expect(btn).toHaveClass(/sp-button--small/);
		expect(afterEl.display).toBe('block');
		expect(afterEl.width).toBe('12px');
		expect(afterEl.height).toBe(afterEl.width);
	});

	test('loader icon', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Icon', 'select', 'bell');
		await setControl(page, 'Content', 'text', ' ');
		const icon = btn.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Disabled', 'checkbox', 'true');
		await setControl(page, 'Loader', 'checkbox', 'true');

		await expect(btn).toHaveClass(/sp-button--loader/);
		await expect(icon).not.toBeVisible();
	});

	test('loader rounded', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await setControl(page, 'Loader', 'checkbox', 'true');
		await expect(btn).toBeVisible();

		await setControl(page, 'Round', 'checkbox', 'true');

		const afterEl = await btn.evaluate((el) => {
			return window.getComputedStyle(el, ':after');
		});

		await expect(btn).toHaveClass(/sp-button--loader/);
		await expect(btn).toHaveClass(/sp-button--round/);
		expect(afterEl.display).toBe('none');
		expect(afterEl.width).toBe('16px');
		expect(afterEl.height).toBe(afterEl.width);
	});

	test('button medium', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();
		const btnRect = await btn.boundingBox();
		expect(btnRect!.height).toBe(40);
	});

	test('button large', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();
		await setControl(page, 'Size', 'select', 'large');
		const btnRect = await btn.boundingBox();
		expect(btnRect!.height).toBe(48);
	});

	test('button small', async ({ page }) => {
		const btn = canvas.getByRole('button');
		await expect(btn).toBeVisible();
		await setControl(page, 'Size', 'select', 'small');
		const btnRect = await btn.boundingBox();
		expect(btnRect!.height).toBe(24);
	});
});
