import { test, expect } from '@playwright/test';
import { secondary } from '../src/stories/button/button.test.js';
import { loadStory, setControl, getStyles } from './_utils.js';

const getButtonUrl = (variant = 0) =>
	`/story/src-historie-button-button-story-svelte?variantId=src-historie-button-button-story-svelte-${variant}`;

test.describe('Button component', () => {
	test('should render a basic button component', async ({ page }) => {
		await page.goto(getButtonUrl());
		// const preview = canvas.locator('.histoire-story-variant-grid-item');

		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();
		const styles = await getStyles(btn);
		const btnRect = await btn.boundingBox();
		const ripple = btn.locator('.sp-button--ripple');

		console.log(await ripple.innerHTML());

		await expect(btn).toHaveClass(/sp-button/);
		await expect(btn).toHaveClass(/sp-button--primary/);
		await expect(btn).toHaveClass(/sp-button--medium/);
		await expect(btn).not.toHaveClass(/sp-button--active/);
		expect(await btn.innerText()).toBe('Submit');
		expect(styles.backgroundColor).toBe('rgb(181, 152, 255)');
		expect(styles.borderRadius).toBe('5px');
		expect(styles.color).toBe('rgb(22, 33, 55)');

		// test hover effect
		const hoverPseudoStyle = await btn.evaluate((el) => {
			return window.getComputedStyle(el, ':before');
		});

		const hoverPseudoWidth = Number(
			hoverPseudoStyle.width.replace('px', '')
		);
		const hoverPseudoHeight = Number(
			hoverPseudoStyle.height.replace('px', '')
		);
		expect(hoverPseudoStyle.opacity).toBe('0');
		expect(hoverPseudoWidth).toBeGreaterThan(btnRect!.width);
		expect(hoverPseudoHeight).toBe(btnRect!.height);
		expect(hoverPseudoStyle.transform).toMatch(
			// /^matrix\(1, 0, 0, 1, -?[0-9]{1-3}(.[0-9]{1-2})?, 0\)/
			/^matrix\(1, 0, 0, 1, -.*/
		);

		// test ripple effect
		await page.mouse.move(
			btnRect!.x + btnRect!.width * 0.5,
			btnRect!.y + btnRect!.height * 0.5
		);

		await page.mouse.down();
		// await expect(ripple).not.toBeVisible();
		await expect(btn).toHaveClass(/sp-button--active/);
		// await expect(ripple).toBeVisible();
		await page.mouse.up();
		await expect(btn).not.toHaveClass(/sp-button--active/);
		// expect(ripple).not.toBeVisible();
	});

	test('secondary', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'secondary');

		await expect(btn).toHaveClass(/sp-button--secondary/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(255, 233, 120)');
	});

	test('tertiary', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'tertiary');

		await expect(btn).toHaveClass(/sp-button--tertiary/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(161, 253, 165)');
	});

	test('quaternary', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'quaternary');

		await expect(btn).toHaveClass(/sp-button--quaternary/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(158, 228, 250)');
	});

	test('dark', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'dark');

		await expect(btn).toHaveClass(/sp-button--dark/);
		const styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(22, 33, 55)');
		expect(styles.color).toBe('rgb(220, 222, 225)');
	});

	test('light', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Mode', 'select', 'light');

		await expect(btn).toHaveClass(/sp-button--light/);
		let styles = await getStyles(btn);
		expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
		expect(styles.boxShadow).toBe(
			'rgb(220, 222, 225) 0px 0px 0px 1px inset'
		);

		await btn.hover();
		styles = await getStyles(btn);
		await expect(styles.boxShadow).toBe(
			'rgb(196, 199, 205) 0px 0px 0px 1px inset'
		);
	});

	test('rounded', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Round', 'checkbox', 'true');

		await expect(btn).toHaveClass(/sp-button--round/);
		const styles = await getStyles(btn);
		expect(styles.borderRadius).toBe('32px');
	});

	test('block', async ({ page }) => {
		await page.goto(getButtonUrl());
		const btn = page.locator('button').first();
		await expect(btn).toBeVisible();

		await setControl(page, 'Block', 'checkbox', 'true');

		await expect(btn).toHaveClass(/sp-button--block/);
		// const paddingSize = 35; // padding is approximately 35px
		// expect(btn.offsetWidth).toBeGreaterThan(
		// 	global.innerWidth - paddingSize
		// );
	});

	test('disabled', async ({ page }) => {
		await page.goto(getButtonUrl(2));
		const btn = page.locator('button.sp-button').last();
		await expect(btn).toBeVisible();
		const icon = btn.locator('svg path');
		await expect(icon).toBeVisible();

		await setControl(page, 'Disabled', 'checkbox', 'true');

		const styles = await getStyles(btn);
		const iconStyle = await getStyles(icon);

		await expect(btn).toBeDisabled();
		expect(styles.backgroundColor).toBe('rgb(236, 229, 255)');
		expect(styles.color).toBe('rgb(219, 204, 255)');
		expect(iconStyle.fill).toBe(styles.color);
	});

	// test('secondaryDisabled', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const styles = await getStyles(btn);
	// 	const icon = btn.locator('svg path');
	// 	const iconStyle = window.getComputedStyle(icon as Element);
	// 	expect(btn.disabled).toBe(true);
	// 	expect(styles.backgroundColor).toBe('rgb(255, 245, 188)');
	// 	expect(styles.color).toBe('rgb(250, 199, 102)');
	// 	expect(iconStyle.getPropertyValue('fill')).toBe(styles.color);
	// });

	// test('tertiaryDisabled', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const styles = await getStyles(btn);
	// 	const icon = btn.locator('svg path');
	// 	const iconStyle = window.getComputedStyle(icon as Element);
	// 	expect(btn.disabled).toBe(true);
	// 	expect(styles.backgroundColor).toBe('rgb(217, 254, 219)');
	// 	expect(styles.color).toBe('rgb(123, 228, 146)');
	// 	expect(iconStyle.getPropertyValue('fill')).toBe(styles.color);
	// });

	// test('quaternaryDisabled', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const styles = await getStyles(btn);
	// 	const icon = btn.locator('svg path');
	// 	const iconStyle = window.getComputedStyle(icon as Element);
	// 	expect(btn.disabled).toBe(true);
	// 	expect(styles.backgroundColor).toBe('rgb(216, 244, 253)');
	// 	expect(styles.color).toBe('rgb(120, 196, 238)');
	// 	expect(iconStyle.getPropertyValue('fill')).toBe(styles.color);
	// });

	// test('darkDisabled', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const styles = await getStyles(btn);
	// 	const icon = btn.locator('svg path');
	// 	const iconStyle = window.getComputedStyle(icon as Element);

	// 	expect(btn.disabled).toBe(true);
	// 	expect(styles.backgroundColor).toBe('rgb(220, 222, 225)');
	// 	expect(styles.color).toBe('rgb(115, 122, 135)');
	// 	expect(iconStyle.fill).toBe(styles.color);
	// });

	// test('lightDisabled', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const styles = await getStyles(btn);
	// 	const icon = btn.locator('svg path');
	// 	const iconStyle = window.getComputedStyle(icon as Element);

	// 	expect(btn.disabled).toBe(true);
	// 	expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
	// 	expect(styles.color).toBe('rgb(220, 222, 225)');
	// 	expect(iconStyle.getPropertyValue('fill')).toBe(styles.color);
	// });

	// // icon buttons

	// test('iconDefault', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnStyle = window.getComputedStyle(btn);
	// 	expect(btnStyle.backgroundColor).toBe('rgb(181, 152, 255)');
	// 	expect(btnStyle.color).toBe('rgb(22, 33, 55)');
	// 	expect(btn).toBeVisible();

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const bBox = await icon.boundingBox();
	// 	const iconPath: SVGSVGElement | null = btn.querySelector('svg path');

	// 	if (!iconPath) {
	// 		throw new Error('could not find icon path');
	// 	}

	// 	const iconStyle = window.getComputedStyle(iconPath as Element);

	// 	expect(icon).toBeVisible();
	// 	expect(bBox.width).toBe(20);
	// 	expect(bBox.height).toBe(20);
	// 	expect(iconStyle.getPropertyValue('fill')).toBe(
	// 		btnStyle.getPropertyValue('color')
	// 	);
	// });

	// test('iconLeft', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const bBox = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(bBox.width).toBe(20);
	// 	expect(bBox.height).toBe(20);
	// });

	// test('iconDark', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnStyle = window.getComputedStyle(btn);
	// 	expect(btnStyle.backgroundColor).toBe('rgb(22, 33, 55)');
	// 	expect(btnStyle.color).toBe('rgb(220, 222, 225)');
	// 	expect(btn).toBeVisible();

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const bBox = await icon.boundingBox();
	// 	const iconPath: SVGSVGElement | null = btn.querySelector('svg path');

	// 	if (!iconPath) {
	// 		throw new Error('could not find icon path');
	// 	}

	// 	const iconStyle = window.getComputedStyle(iconPath as Element);

	// 	expect(icon).toBeVisible();
	// 	expect(bBox.width).toBe(20);
	// 	expect(bBox.height).toBe(20);
	// 	expect(iconStyle.getPropertyValue('fill')).toBe(
	// 		btnStyle.getPropertyValue('color')
	// 	);
	// });

	// test('iconSmall', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const bBox = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(bBox.width).toBe(16);
	// 	expect(bBox.height).toBe(16);
	// });

	// test('iconLarge', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const bBox = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(bBox.width).toBe(24);
	// 	expect(bBox.height).toBe(24);
	// });

	// test('action', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.width).toBe(32);
	// 	expect(btnRect!.height).toBe(32);

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const iconRect = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(iconRect.width).toBe(20);
	// 	expect(iconRect.height).toBe(20);
	// });

	// test('actionSmall', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.width).toBe(24);
	// 	expect(btnRect!.height).toBe(24);

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const iconRect = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(iconRect.width).toBe(16);
	// 	expect(iconRect.height).toBe(16);
	// });

	// test('actionLarge', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.width).toBe(48);
	// 	expect(btnRect!.height).toBe(48);

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const iconRect = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(iconRect.width).toBe(24);
	// 	expect(iconRect.height).toBe(24);
	// });

	// test('actionTertiaryRoundLarge', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	expect(btn).toBeVisible();
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.width).toBe(48);
	// 	expect(btnRect!.height).toBe(48);

	// 	const icon = btn.locator('svg');

	// 	if (!icon) {
	// 		throw new Error('could not find icon svg');
	// 	}

	// 	const iconRect = await icon.boundingBox();
	// 	expect(icon).toBeVisible();
	// 	expect(iconRect.width).toBe(24);
	// 	expect(iconRect.height).toBe(24);
	// 	const styles = await getStyles(btn);
	// 	expect(styles.borderRadius).toBe('32px');
	// });

	// //loader button

	// test('loaderDefault', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnLabel = btn.querySelector('.sp-button--label');
	// 	const styles = await getStyles(btn);
	// 	const afterEl = window.getComputedStyle(btn, ':after');
	// 	userEvent.click(btn);
	// 	expect(btn).toBeVisible();
	// 	expect(btnLabel).not.toBeVisible();
	// 	expect(btn).not.toHaveFocus();
	// 	expect(styles.backgroundColor).toBe('rgb(181, 152, 255)');
	// 	expect(btn.innerText).toBe('');
	// 	expect(btn).toHaveClass(/sp-button--loader/);
	// 	expect(afterEl.getPropertyValue('display')).toBe('block');
	// 	expect(afterEl.getPropertyValue('width')).toBe('16px');
	// 	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
	// 	expect(afterEl.getPropertyValue('border-radius')).toBe('100%');
	// 	expect(afterEl.getPropertyValue('animation-duration')).toBe('1s');
	// 	expect(afterEl.getPropertyValue('animation-timing-function')).toBe(
	// 		'linear'
	// 	);
	// 	expect(afterEl.getPropertyValue('animation-iteration-count')).toBe(
	// 		'infinite'
	// 	);
	// 	expect(afterEl.getPropertyValue('border-bottom')).toBe(
	// 		'2px solid rgb(22, 33, 55)'
	// 	);
	// 	expect(afterEl.getPropertyValue('border-top')).toBe(
	// 		'2px solid rgba(0, 0, 0, 0)'
	// 	);
	// });

	// test('loaderSecondaryLarge', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const afterEl = window.getComputedStyle(btn, ':after');
	// 	expect(btn.innerText).toBe('');
	// 	expect(btn).toHaveClass(/sp-button--loader/);
	// 	expect(btn).toHaveClass(/sp-button--large/);
	// 	expect(afterEl.getPropertyValue('display')).toBe('block');
	// 	expect(afterEl.getPropertyValue('width')).toBe('18px');
	// 	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
	// });

	// test('loaderTertiarySmall', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const afterEl = window.getComputedStyle(btn, ':after');
	// 	expect(btn.innerText).toBe('');
	// 	expect(btn).toHaveClass(/sp-button--loader/);
	// 	expect(btn).toHaveClass(/sp-button--small/);
	// 	expect(afterEl.getPropertyValue('display')).toBe('block');
	// 	expect(afterEl.getPropertyValue('width')).toBe('12px');
	// 	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
	// });

	// test('loaderWithIcon', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnLabel = btn.locator('.sp-button--label');
	// 	if (!btnLabel) {
	// 		throw new Error('Button label should be present but hidden ');
	// 	}
	// 	expect(btn).toHaveClass(/sp-button--loader/);
	// 	expect(btnLabel.innerHTML).toContain('svg');
	// 	expect(btnLabel).not.toBeVisible();
	// });

	// test('loaderRounded', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const afterEl = window.getComputedStyle(btn, ':after');
	// 	expect(btn.innerText).toBe('');
	// 	expect(btn).toHaveClass(/sp-button--loader/);
	// 	expect(btn).toHaveClass(/sp-button--round/);
	// 	expect(afterEl.getPropertyValue('display')).toBe('block');
	// 	expect(afterEl.getPropertyValue('width')).toBe('16px');
	// 	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
	// });

	// //size button

	// test('large', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.height).toBe(48);
	// });

	// test('medium', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.height).toBe(40);
	// });

	// test('small', async ({ page }) => {
	// 	await page.goto(getButtonUrl());

	// 	const btn = page.getByRole('button');
	// 	const btnRect = await btn.boundingBox();
	// 	expect(btnRect!.height).toBe(24);
	// });
});
