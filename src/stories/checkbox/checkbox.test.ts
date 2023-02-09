import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const primary = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkbox: HTMLInputElement = canvas.getByRole('checkbox');
	const label = checkbox.nextSibling?.nextSibling as HTMLLabelElement;
	const labelText = label.querySelector(
		'.sp-checkbox--label'
	) as HTMLSpanElement;
	const check = label.querySelector('.sp-checkbox--check') as HTMLSpanElement;

	expect(checkbox).not.toBeDisabled();
	expect(checkbox).not.toHaveFocus();
	userEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(checkbox).toHaveFocus();
	expect(res.args.changeHandler).toHaveBeenCalled();

	expect(label).toBeDefined();
	expect(label).toHaveClass('sp-checkbox');
	expect(label).not.toHaveClass('sp-checkbox--prepend');
	expect(label).toHaveAttribute('for', checkbox.id);

	expect(labelText).toBeDefined();
	expect(labelText).toHaveTextContent('Subscribe');

	expect(check).toBeDefined();
	expect(check.querySelector('svg')).toBeDefined();
};

export const disabled = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkbox: HTMLInputElement = canvas.getByRole('checkbox');
	expect(checkbox).toBeDisabled();
	userEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(checkbox).not.toHaveFocus();
	expect(res.args.changeHandler).not.toHaveBeenCalled();
};

export const prepended = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkbox: HTMLInputElement = canvas.getByRole('checkbox');
	const label = checkbox.nextSibling?.nextSibling as HTMLLabelElement;
	const labelStyles: CSSStyleDeclaration = window.getComputedStyle(label);

	expect(label).toBeDefined();
	expect(label).toHaveClass('sp-checkbox--prepend');
	expect(labelStyles.getPropertyValue('flex-direction')).toBe('row-reverse');
};

export const multiple = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkboxes = canvas.getAllByRole('checkbox');
	expect(checkboxes.length).toBe(3);
	for (const checkbox of checkboxes) {
		expect(checkbox).toBeDefined();
		userEvent.click(checkbox);
		expect(checkbox).toBeChecked();
		expect(checkbox).toHaveFocus();
	}
};
