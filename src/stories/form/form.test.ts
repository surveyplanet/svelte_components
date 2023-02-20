import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

export const formSubmitHandler = (event: SvelteCustomEvent) => {
	console.log('formSubmitHandler');
	console.log(event.detail);
	action('submit')();
	expect(event.detail).toBeDefined(); // pass
	// TODO: make sure correct properties
};

export const basic = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const submit = canvas.getByRole('button');
	const form = submit.parentElement;
	const name = canvas.getByLabelText('First name');
	const lastName = canvas.getByLabelText('Last name');
	const email = canvas.getByLabelText('Email');
	const radios: HTMLInputElement[] = canvas.getAllByRole('radio');
	const checkboxes = canvas.getAllByRole('checkbox');

	expect(form).toBeInTheDocument();
	expect(lastName).toBeInTheDocument();
	expect(email).toBeInTheDocument();
	expect(radios[0]).toBeInTheDocument();
	expect(checkboxes).toHaveLength(2);
	expect(submit).toBeInTheDocument();

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

	userEvent.click(checkboxes[0]);
	userEvent.click(checkboxes[1]);
	expect(checkboxes[0]).toBeChecked();
	expect(checkboxes[1]).toBeChecked();
	userEvent.click(submit);
	expect(res.args.submitHandler).toHaveBeenCalled(); // fail
};
