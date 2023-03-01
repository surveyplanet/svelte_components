import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Avatar component', () => {
	test.only('should render basic avatar component in Small size', async ({
		page,
	}) => {
		const preview = await loadStory(page, 'avatar');

		const value = 'Small';
		await setControl(page, 'Size', 'select', value);
		const avatar = preview.getByRole('button');

		const bgColor = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('background-color');
		});
		const height = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('height');
		});
		const width = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('width');
		});
		const borderRadius = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('border-radius');
		});
		const img = preview.getByRole('img');
		const src = await img.evaluate((el) => {
			return el.getAttribute('src');
		});
		const alt = await img.evaluate((el) => {
			return el.getAttribute('alt');
		});
		expect(avatar).toBeVisible();
		await expect(avatar).toHaveClass(/sp-avatar/);
		await expect(avatar).toHaveClass(/sp-avatar--small/);
		expect(bgColor).toBe('rgb(158, 228, 250)');
		expect(height).toBe('36px');
		expect(width).toBe('36px');
		expect(borderRadius).toBe('100%');
		expect(src).toBe(
			'https://via.placeholder.com/512/9ee4fa/162137?text=MARVIN'
		);
		expect(alt).toBe('profile');
		console.log(avatar);

		// await expect(avatar).toHaveAttribute('role', 'button');

		// expect(avatar).not.toHaveAttribute('role', 'presentation');
		// expect(avatar).toHaveAttribute('aria-label', 'profile image');
		// expect(avatar.isDisabled).toBe(false);
		// userEvent.click(avatar);
		// expect(res.args.clickHandler).toHaveBeenCalled();
	});

	test('should render avatar with custom image and Medium size', async ({
		page,
	}) => {
		const preview = await loadStory(page, 'avatar');
		const value = 'Medium';
		await setControl(page, 'Size', 'select', value);
		await setControl(
			page,
			'Image source',
			'text',
			'https://via.placeholder.com/512/FFB1E3/FFFFFF?text=CUSTOM'
		);

		const avatar = preview.getByRole('button');
		const bgColor = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('background-color');
		});
		const height = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('height');
		});
		const width = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('width');
		});
		const borderRadius = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('border-radius');
		});
		const img = preview.getByRole('img');
		const src = await img.evaluate((el) => {
			return el.getAttribute('src');
		});
		const alt = await img.evaluate((el) => {
			return el.getAttribute('alt');
		});

		expect(avatar).toBeVisible();
		await expect(avatar).toHaveClass(/sp-avatar/);
		await expect(avatar).toHaveClass(/sp-avatar--medium/);
		expect(bgColor).toBe('rgb(158, 228, 250)');
		expect(height).toBe('48px');
		expect(width).toBe('48px');
		expect(borderRadius).toBe('100%');
		expect(src).toBe(
			'https://via.placeholder.com/512/FFB1E3/FFFFFF?text=CUSTOM'
		);
		expect(alt).toBe('profile');
	});

	test('should render avatar with custom text', async ({ page }) => {
		const preview = await loadStory(page, 'avatar');
		const value = 'Large';
		await setControl(page, 'Size', 'select', value);
		await setControl(page, 'Mascot', 'select', 'Jack');

		const avatar = preview.getByRole('button');
		const bgColor = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('background-color');
		});
		const height = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('height');
		});
		const width = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('width');
		});
		const borderRadius = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('border-radius');
		});
		const img = preview.getByRole('img');
		const src = await img.evaluate((el) => {
			return el.getAttribute('src');
		});
		const alt = await img.evaluate((el) => {
			return el.getAttribute('alt');
		});

		expect(avatar).toBeVisible();
		await expect(avatar).toHaveClass(/sp-avatar/);
		await expect(avatar).toHaveClass(/sp-avatar--large/);
		expect(bgColor).toBe('rgb(158, 228, 250)');
		expect(height).toBe('64px');
		expect(width).toBe('64px');
		expect(borderRadius).toBe('100%');
		expect(src).toBe(
			'https://via.placeholder.com/512/ffe978/162137?text=JACK'
		);
		expect(alt).toBe('profile');
	});

	// test('should render avatar as disabled', async ({ page }) => {
	//     const preview = await loadStory(page, 'avatar');
	//     const value = 'Large';
	//     await setControl(page, 'Size', 'select', value);
	//     await setControl(page, 'Disabled', 'checkbox', true);

	//     const avatar = preview.getByRole('button');
	//     const bgColor = await avatar.evaluate((el) => {

	// export const disabled = (res: StoryBookPlayArgs) => {
	// 	const canvas = within(res.canvasElement);
	// 	const avatar = canvas.getByRole('presentation') as HTMLButtonElement;
	// 	expect(avatar).toBeTruthy();
	// 	userEvent.click(avatar);
	// 	expect(avatar.disabled).toBe(true);
	// 	expect(avatar).toHaveAttribute('role', 'presentation');
	// 	expect(avatar).not.toHaveAttribute('aria-label');
	// 	expect(res.args.clickHandler).not.toHaveBeenCalled();
	// };
});
