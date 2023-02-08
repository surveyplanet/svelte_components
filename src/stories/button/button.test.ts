import { within, userEvent, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '../../lib';

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const btnRect = btn.getBoundingClientRect();
	const ripple = btn.querySelector('.sp-button--ripple');

	expect(btn).toBeInTheDocument();
	expect(btn).toBeVisible();
	expect(btn).toHaveClass('sp-button');
	expect(btn).toHaveClass('sp-button--primary');
	expect(btn).toHaveClass('sp-button--medium');
	// expect(btn).toHaveClass('sp-button--active');
	expect(btn.innerText).toBe('Button');
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(181, 152, 255)'
	);
	expect(style.getPropertyValue('border-radius')).toBe('5px');
	expect(style.getPropertyValue('color')).toBe('rgb(22, 33, 55)');

	// test hover effect
	const hoverPseudoStyle = window.getComputedStyle(btn, ':before');
	const hoverPseudoWidth = Number(hoverPseudoStyle.width.replace('px', ''));
	const hoverPseudoHeight = Number(hoverPseudoStyle.height.replace('px', ''));
	expect(hoverPseudoStyle.getPropertyValue('opacity')).toBe('0');
	expect(hoverPseudoWidth).toBeGreaterThan(btnRect.width);
	expect(hoverPseudoHeight).toBe(btnRect.height);
	expect(hoverPseudoStyle.getPropertyValue('transform')).toMatch(
		// /^matrix\(1, 0, 0, 1, -?[0-9]{1-3}(.[0-9]{1-2})?, 0\)/
		/^matrix\(1, 0, 0, 1, -.*/
	);
	// can't test result of hover state for some reason
	// await userEvent.hover(btn);
	// await delay(500); // transition speed
	// expect(hoverPseudoStyle.opacity).toBe('1');

	// test ripple effect
	expect(ripple).toBeInTheDocument();
	expect(ripple).not.toBeVisible();
	await fireEvent.mouseDown(btn);
	expect(btn).toHaveClass('sp-button--active');
	await delay(250);
	expect(ripple).toBeVisible();
	await fireEvent.mouseUp(btn);
	expect(btn).not.toHaveClass('sp-button--active');
	await delay(250);
	expect(ripple).not.toBeVisible();

	await userEvent.click(btn);
	expect(res.args.clickHandler).toHaveBeenCalled();
	expect(btn).toHaveFocus();
};

export const secondary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--secondary');
	const style = window.getComputedStyle(btn);
	expect(btn).toBeVisible();
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(255, 233, 120)'
	);
};

export const tertiary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--tertiary');
	const style = window.getComputedStyle(btn);
	expect(btn).toBeVisible();
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(161, 253, 165)'
	);
};

export const quaternary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--quaternary');
	const style = window.getComputedStyle(btn);
	expect(btn).toBeVisible();
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(158, 228, 250)'
	);
};

export const dark = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--dark');
	const style = window.getComputedStyle(btn);
	expect(btn).toBeVisible();
	expect(style.getPropertyValue('background-color')).toBe('rgb(22, 33, 55)');
	expect(style.getPropertyValue('color')).toBe('rgb(220, 222, 225)');
};

export const light = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--light');
	const style = window.getComputedStyle(btn);
	expect(btn).toBeVisible();
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(255, 255, 255)'
	);
	expect(style.boxShadow).toBe('rgb(220, 222, 225) 0px 0px 0px 1px inset');
	// can't get inner shadow change...
	// await userEvent.hover(btn);
	// style = window.getComputedStyle(btn);
	// await delay(250);
	// expect(style.getPropertyValue('box-shadow')).toBe('rgb(196, 199, 205) 0px 0px 0px 1px inset');
};

export const rounded = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--round');
	expect(btn).toBeVisible();
	const style = window.getComputedStyle(btn);
	expect(style.getPropertyValue('border-radius')).toBe('32px');
};

export const block = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toHaveClass('sp-button--block');
	// console.log(global.document.body.style.padding); // there is no padding
	expect(btn).toBeVisible();
	const paddingSize = 35; // padding is approximately 35px
	expect(btn.offsetWidth).toBeGreaterThan(global.innerWidth - paddingSize);
};

export const empty = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();
};

//disabled button

export const defaultDisabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const icon: SVGSVGElement | null = btn.querySelector('svg path');
	const iconStyle = window.getComputedStyle(icon as Element);
	expect(btn).toBeVisible();
	expect(btn.disabled).toBe(true);
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(236, 229, 255)'
	);
	expect(style.getPropertyValue('color')).toBe('rgb(219, 204, 255)');
	expect(iconStyle.getPropertyValue('fill')).toBe(
		style.getPropertyValue('color')
	);
	await userEvent.click(btn);
	expect(btn).not.toHaveFocus();
};

export const secondaryDisabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const icon: SVGSVGElement | null = btn.querySelector('svg path');
	const iconStyle = window.getComputedStyle(icon as Element);
	expect(btn.disabled).toBe(true);
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(255, 245, 188)'
	);
	expect(style.getPropertyValue('color')).toBe('rgb(250, 199, 102)');
	expect(iconStyle.getPropertyValue('fill')).toBe(
		style.getPropertyValue('color')
	);
};

export const tertiaryDisabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const icon: SVGSVGElement | null = btn.querySelector('svg path');
	const iconStyle = window.getComputedStyle(icon as Element);
	expect(btn.disabled).toBe(true);
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(217, 254, 219)'
	);
	expect(style.getPropertyValue('color')).toBe('rgb(123, 228, 146)');
	expect(iconStyle.getPropertyValue('fill')).toBe(
		style.getPropertyValue('color')
	);
};

export const quaternaryDisabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const icon: SVGSVGElement | null = btn.querySelector('svg path');
	const iconStyle = window.getComputedStyle(icon as Element);
	expect(btn.disabled).toBe(true);
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(216, 244, 253)'
	);
	expect(style.getPropertyValue('color')).toBe('rgb(120, 196, 238)');
	expect(iconStyle.getPropertyValue('fill')).toBe(
		style.getPropertyValue('color')
	);
};

export const darkDisabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const icon: SVGSVGElement | null = btn.querySelector('svg path');
	const iconStyle = window.getComputedStyle(icon as Element);

	expect(btn.disabled).toBe(true);
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(220, 222, 225)'
	);
	expect(style.getPropertyValue('color')).toBe('rgb(115, 122, 135)');
	expect(iconStyle.getPropertyValue('fill')).toBe(
		style.getPropertyValue('color')
	);
};

export const lightDisabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const icon: SVGSVGElement | null = btn.querySelector('svg path');
	const iconStyle = window.getComputedStyle(icon as Element);

	expect(btn.disabled).toBe(true);
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(255, 255, 255)'
	);
	expect(style.getPropertyValue('color')).toBe('rgb(220, 222, 225)');
	expect(iconStyle.getPropertyValue('fill')).toBe(
		style.getPropertyValue('color')
	);
};

// icon buttons

export const iconDefault = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const btnStyle = window.getComputedStyle(btn);
	expect(btnStyle.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btnStyle.color).toBe('rgb(22, 33, 55)');
	expect(btn).toBeVisible();

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const bBox = icon.getBoundingClientRect();
	const iconPath: SVGSVGElement | null = btn.querySelector('svg path');

	if (!iconPath) {
		throw new Error('could not find icon path');
	}

	const iconStyle = window.getComputedStyle(iconPath as Element);

	expect(icon).toBeVisible();
	expect(bBox.width).toBe(20);
	expect(bBox.height).toBe(20);
	expect(iconStyle.getPropertyValue('fill')).toBe(
		btnStyle.getPropertyValue('color')
	);
};

export const iconLeft = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const bBox = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(bBox.width).toBe(20);
	expect(bBox.height).toBe(20);
};

export const iconDark = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const btnStyle = window.getComputedStyle(btn);
	expect(btnStyle.backgroundColor).toBe('rgb(22, 33, 55)');
	expect(btnStyle.color).toBe('rgb(220, 222, 225)');
	expect(btn).toBeVisible();

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const bBox = icon.getBoundingClientRect();
	const iconPath: SVGSVGElement | null = btn.querySelector('svg path');

	if (!iconPath) {
		throw new Error('could not find icon path');
	}

	const iconStyle = window.getComputedStyle(iconPath as Element);

	expect(icon).toBeVisible();
	expect(bBox.width).toBe(20);
	expect(bBox.height).toBe(20);
	expect(iconStyle.getPropertyValue('fill')).toBe(
		btnStyle.getPropertyValue('color')
	);
};

export const iconSmall = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const bBox = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(bBox.width).toBe(16);
	expect(bBox.height).toBe(16);
};

export const iconLarge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const bBox = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(bBox.width).toBe(24);
	expect(bBox.height).toBe(24);
};

export const action = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.width).toBe(32);
	expect(btnRect.height).toBe(32);

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const iconRect = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(iconRect.width).toBe(20);
	expect(iconRect.height).toBe(20);
};

export const actionSmall = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.width).toBe(24);
	expect(btnRect.height).toBe(24);

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const iconRect = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(iconRect.width).toBe(16);
	expect(iconRect.height).toBe(16);
};

export const actionLarge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.width).toBe(48);
	expect(btnRect.height).toBe(48);

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const iconRect = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(iconRect.width).toBe(24);
	expect(iconRect.height).toBe(24);
};

export const actionTertiaryRoundLarge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	expect(btn).toBeVisible();
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.width).toBe(48);
	expect(btnRect.height).toBe(48);

	const icon: SVGSVGElement | null = btn.querySelector('svg');

	if (!icon) {
		throw new Error('could not find icon svg');
	}

	const iconRect = icon.getBoundingClientRect();
	expect(icon).toBeVisible();
	expect(iconRect.width).toBe(24);
	expect(iconRect.height).toBe(24);
	const style = window.getComputedStyle(btn);
	expect(style.getPropertyValue('border-radius')).toBe('32px');
};

//loader button

export const loaderDefault = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const btnLabel = btn.querySelector('.sp-button--label');
	const style = window.getComputedStyle(btn);
	const afterEl = window.getComputedStyle(btn, ':after');
	await userEvent.click(btn);
	expect(btn).toBeVisible();
	expect(btnLabel).not.toBeVisible();
	expect(btn).not.toHaveFocus();
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(181, 152, 255)'
	);
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
	expect(afterEl.getPropertyValue('display')).toBe('block');
	expect(afterEl.getPropertyValue('width')).toBe('16px');
	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
	expect(afterEl.getPropertyValue('border-radius')).toBe('100%');
	expect(afterEl.getPropertyValue('animation-duration')).toBe('1s');
	expect(afterEl.getPropertyValue('animation-timing-function')).toBe(
		'linear'
	);
	expect(afterEl.getPropertyValue('animation-iteration-count')).toBe(
		'infinite'
	);
	expect(afterEl.getPropertyValue('border-bottom')).toBe(
		'2px solid rgb(22, 33, 55)'
	);
	expect(afterEl.getPropertyValue('border-top')).toBe(
		'2px solid rgba(0, 0, 0, 0)'
	);
};

export const loaderSecondaryLarge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const afterEl = window.getComputedStyle(btn, ':after');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
	expect(btn).toHaveClass('sp-button--large');
	expect(afterEl.getPropertyValue('display')).toBe('block');
	expect(afterEl.getPropertyValue('width')).toBe('18px');
	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
};

export const loaderTertiarySmall = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const afterEl = window.getComputedStyle(btn, ':after');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
	expect(btn).toHaveClass('sp-button--small');
	expect(afterEl.getPropertyValue('display')).toBe('block');
	expect(afterEl.getPropertyValue('width')).toBe('12px');
	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
};

export const loaderWithIcon = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const btnLabel = btn.querySelector('.sp-button--label');
	if (!btnLabel) {
		throw new Error('Button label should be present but hidden ');
	}
	expect(btn).toHaveClass('sp-button--loader');
	expect(btnLabel.innerHTML).toContain('svg');
	expect(btnLabel).not.toBeVisible();
};

export const loaderRounded = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const afterEl = window.getComputedStyle(btn, ':after');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
	expect(btn).toHaveClass('sp-button--round');
	expect(afterEl.getPropertyValue('display')).toBe('block');
	expect(afterEl.getPropertyValue('width')).toBe('16px');
	expect(afterEl.getPropertyValue('height')).toBe(afterEl.width);
};

//size button

export const large = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.height).toBe(48);
};

export const medium = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.height).toBe(40);
};

export const small = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const btn = canvas.getByRole('button');
	const btnRect = btn.getBoundingClientRect();
	expect(btnRect.height).toBe(24);
};
