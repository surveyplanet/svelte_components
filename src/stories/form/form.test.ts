import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const form = canvas.getByTestId('form');
	const name = canvas.getByLabelText('First name');
	const lastName = canvas.getByLabelText('Last name');
	const email = canvas.getByLabelText('Email');
	const radios: HTMLInputElement[] = canvas.getAllByRole('radio');
	const checkbox = canvas.getByRole('checkbox');
	const submit = canvas.getByRole('button');

	expect(form).toBeVisible();
	expect(lastName).toBeVisible();
	expect(email).toBeVisible();
	expect(radios[0]).toBeVisible();
	expect(checkbox).toBeVisible();
	expect(submit).toBeVisible();

	expect(form).toHaveClass('sp-form');

	expect(name).not.toBeDisabled();
	expect(name).not.toHaveFocus();
	expect(name).toHaveAttribute('name');

	userEvent.type(name, 'John');
	expect(name).toHaveValue('John');

	expect(lastName).not.toBeDisabled();
	expect(lastName).not.toHaveFocus();
	expect(lastName).toHaveAttribute('id', 'last_name');
	expect(lastName).toHaveAttribute('name', 'last_name');
	expect(lastName).toHaveAttribute('type', 'text');

	userEvent.type(lastName, 'Doe');

	userEvent.type(email, 'john.doe@example.com');
	expect(email).toHaveValue('john.doe@example.com');

	expect(radios).toHaveLength(3);

	userEvent.click(radios[0]);
	expect(radios[0]).toBeChecked();
	expect(radios[1]).not.toBeChecked();
	expect(radios[2]).not.toBeChecked();

	userEvent.click(checkbox);

	userEvent.click(submit);

	expect(res.args.submitEventHandler).toHaveBeenCalled();
};
