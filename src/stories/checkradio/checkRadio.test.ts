import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '../../lib/_utils';

export const primaryCheckbox = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkbox: HTMLInputElement = canvas.getByRole('checkbox');
	expect(checkbox.disabled).toBe(false);
	expect(checkbox).not.toHaveFocus();
	await userEvent.click(checkbox);
	await delay(500); // wait for active state animation
	expect(checkbox).toHaveFocus();
	expect(res.args.changeHandler).toHaveBeenCalled();
};

export const primaryRadio = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radio: HTMLInputElement = canvas.getByRole('radio');
	expect(radio).toBeVisible();
	expect(radio.disabled).toBe(false);
	expect(radio).not.toHaveFocus();
	await userEvent.click(radio);
	await delay(500); // wait for active state animation
	expect(radio).toHaveFocus();
	expect(res.args.changeHandler).toHaveBeenCalled();
};

export const disabledCheckbox = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkbox: HTMLInputElement = canvas.getByRole('checkbox');
	expect(checkbox.disabled).toBe(true);
};

export const disabledRadio = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radio: HTMLInputElement = canvas.getByRole('radio');
	expect(radio.disabled).toBe(true);
};

export const multipleCheckboxes = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkboxes = canvas.getAllByRole('checkbox');
	expect(checkboxes.length).toBe(3);
	expect(checkboxes[0].disabled).toBe(false);
	expect(checkboxes[1].disabled).toBe(false);
	expect(checkboxes[2].disabled).toBe(true);
};

export const multipleRadios = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const radios: HTMLInputElement = canvas.getAllByRole('radio');
	console.log(Object.prototype.toString.call(radios));
	expect(radios.length).toBe(3);
	expect(radios[0].disabled).toBe(false);
	expect(radios[1].disabled).toBe(false);
	expect(radios[2].disabled).toBe(true);
	await userEvent.click(radios[0]);
	await delay(500); // wait for active state animation

	expect(res.args.changeHandler).toHaveBeenCalled();
	expect(radios[0].checked).toBe(true);
	expect(radios[1].checked).toBe(false);
	expect(radios[2].checked).toBe(false);
};

export const customAttributes = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const checkbox: HTMLInputElement = canvas.getByRole('checkbox');
	expect(checkbox.getAttribute('data-test')).toBe('test');
	expect(checkbox.getAttribute('data-test2')).toBe('test2');
};
