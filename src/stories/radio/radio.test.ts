import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const primary = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radio: HTMLInputElement = canvas.getByRole('radio');
	const label: HTMLLabelElement = radio.nextSibling
		?.nextSibling as HTMLLabelElement;

	const labelText: HTMLSpanElement = label.querySelector(
		'.sp-radio--label'
	)! as HTMLSpanElement;

	const radioDot: HTMLSpanElement = label.querySelector(
		'.sp-radio--dot'
	)! as HTMLSpanElement;

	expect(radio).toBeVisible();
	expect(radio).not.toBeDisabled();
	expect(radio).not.toHaveFocus();
	userEvent.click(radio);
	expect(radio).toBeChecked();
	expect(radio).toHaveFocus();
	expect(radio).toHaveAttribute('id', 'default');
	expect(radio).toHaveAttribute('name', 'default');
	expect(radio).toHaveAttribute('value', 'default');
	expect(radio).toHaveAttribute('data-test', 'yep');
	expect(res.args.changeHandler).toHaveBeenCalled();

	expect(label).toBeDefined();
	expect(label).toBeVisible();
	expect(label).toHaveClass('sp-radio');
	expect(label).not.toHaveClass('sp-radio--prepend');
	expect(label).toHaveAttribute('for', radio.id);

	expect(labelText).toBeDefined();
	expect(labelText).toBeVisible();
	expect(labelText).toHaveTextContent('Radio Button');

	expect(radioDot).toBeDefined();
	expect(radioDot).toBeVisible();
	expect(radioDot.querySelector('svg')).toBeInstanceOf(SVGSVGElement);
};

export const disabled = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radio: HTMLInputElement = canvas.getByRole('radio');
	expect(radio).toBeDisabled();
	userEvent.click(radio);
	expect(radio).not.toBeChecked();
	expect(radio).not.toHaveFocus();
	expect(res.args.changeHandler).not.toHaveBeenCalled();
};
export const prepended = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radio: HTMLInputElement = canvas.getByRole('radio');
	const label: HTMLLabelElement = radio.nextSibling
		?.nextSibling as HTMLLabelElement;
	const labelStyles: CSSStyleDeclaration = getComputedStyle(label);

	expect(label).toBeVisible();
	expect(label).toHaveClass('sp-radio--prepend');
	expect(labelStyles.getPropertyValue('flex-direction')).toBe('row-reverse');
};

export const multiple = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radios: HTMLInputElement[] = canvas.getAllByRole('radio');

	expect(radios.length).toBe(3);

	for (const radio of radios) {
		expect(radio).toBeVisible();
		expect(radio).not.toBeDisabled();
		expect(radio).not.toHaveFocus();
		userEvent.click(radio);
		expect(radio).toBeChecked();
		expect(radio).toHaveFocus();
		expect(res.args.changeHandler).toHaveBeenCalled();
	}
};
