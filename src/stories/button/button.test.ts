import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';

export const primary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Button');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};
export const render = <T extends object>(args: T) => {
	return {
		Component: Button,
		props: args,
	};
};

export const secondary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
	expect(btn.innerText).toBe('Secondary');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const tertiary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
	expect(btn.innerText).toBe('Tertiary');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const quaternary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(158, 228, 250)');
	expect(btn.innerText).toBe('Quaternary');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};
export const dark = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(22, 33, 55)');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};
export const light = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
	expect(btn.innerText).toBe('Light');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const rounded = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Rounded');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const disabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(236, 229, 255)');
	expect(btn.innerText).toBe('Disabled');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

export const block = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	// console.log(global.document.body.style.padding); // there is no padding
	expect(btn).toBeVisible();
	const paddingSize = 35; // padding is approximately 35px
	expect(btn.offsetWidth).toBeGreaterThan(global.innerWidth - paddingSize);
};

//disabled button

export const DefaultDisabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(236, 229, 255)');
	expect(style.color).toBe('rgb(219, 204, 255)');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

export const SecondaryDisabled = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(255, 245, 188)');
	expect(style.color).toBe('rgb(250, 199, 102)');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

export const TertiaryDisabled = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(217, 254, 219)');
	expect(style.color).toBe('rgb(123, 228, 146)');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

export const QuaternaryDisabled = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(216, 244, 253)');
	expect(style.color).toBe('rgb(120, 196, 238)');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};
export const DarkDisabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(220, 222, 225)');
	expect(style.color).toBe('rgb(115, 122, 135)');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

export const LightDisabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();
	expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
	expect(style.color).toBe('rgb(220, 222, 225)');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

//loader button

export const LoaderDefault = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const afterEl = window.getComputedStyle(btn, ':after');
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
	expect(afterEl.animationDuration).toBe('1s');
	expect(afterEl.animationTimingFunction).toBe('linear');
	expect(afterEl.animationIterationCount).toBe('infinite');
};
export const LoaderSecondaryLarge = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn).toHaveClass('sp-button--loader');
};
export const DefaultSmall = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn).toHaveClass('sp-button--loader');
};

export const LoaderTertiarySmall = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};
export const LoaderWithIcon = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};

export const LoaderRounded = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};

//size button

export const Large = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Large');
	expect(btn.offsetHeight).toBe(48);
};

export const Medium = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Medium');
	expect(btn.offsetHeight).toBe(40);
};

export const Small = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Small');
	expect(btn.offsetHeight).toBe(24);
};
