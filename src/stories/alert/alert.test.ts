import { within, userEvent, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '../../lib';

export const defaultAlert = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');
	const close = canvas.getByRole('button');
	const title = canvas.getByText('Alert Title');
	const subtitle = canvas.getByText('Alert Subtitle');
	const body = canvas.getByText('This is the body');
	const style = window.getComputedStyle(alert);

	expect(alert).toBeInTheDocument();
	expect(title).toBeInTheDocument();
	expect(subtitle).toBeInTheDocument();
	expect(body).toBeInTheDocument();
	expect(style.getPropertyValue('background-color')).toBe(
		'rgb(217, 254, 219)'
	);

	// expect(res.args.alertInHandler).toHaveBeenCalled();
	// expect(res.args.alertOpenHandler).toHaveBeenCalled();
	expect(alert).toHaveClass('sp-alert');
	expect(alert).toHaveClass('sp-alert--info');
	expect(alert).toHaveAttribute('role', 'alert');
	expect(alert).toHaveAttribute('aria-live', 'polite');
	expect(alert).toHaveAttribute('aria-atomic', 'true');

	expect(close).toHaveAttribute('aria-label', 'Close info alert');

	expect(title).toHaveClass('sp-alert--header--title');
	expect(subtitle).toHaveClass('sp-alert--header--subtitle');
	expect(body).toHaveClass('sp-alert--body');

	userEvent.click(close);
	await delay(1000);

	expect(alert).toHaveClass('sp-alert--hidden');
	expect(res.args.alertOutHandler).toHaveBeenCalled();

	// await delay(1000);
	// expect(res.args.alertCloseHandler).toHaveBeenCalled();
};

export const confirmAlert = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');
	const confirmButton = canvas.getByRole('button', { name: 'Confirm' });

	expect(confirmButton).toBeInTheDocument();

	userEvent.click(confirmButton);
	await delay(1000);

	expect(res.args.alertConfirmHandler).toHaveBeenCalled();
	expect(res.args.alertOutHandler).toHaveBeenCalled();

	expect(alert).toHaveClass('sp-alert--hidden');
};

export const challenge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');
	const submitButton = canvas.getByRole('button', { name: 'Submit' });
	const textInput = canvas.getByRole('textbox');

	expect(alert).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();

	userEvent.click(submitButton);

	expect(res.args.challengeHandler).not.toHaveBeenCalled();
	expect(res.args.alertOutHandler).not.toHaveBeenCalled();

	userEvent.type(textInput, 'test');
	expect(textInput).toHaveValue('test');

	await delay(1000);

	// expect(res.args.challengeHandler).toBeCalledTimes(4);

	userEvent.click(submitButton);

	expect(res.args.alertOutHandler).toHaveBeenCalled();
};

export const delayHide = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');

	await delay(1000);

	expect(alert).toHaveClass('sp-alert--hidden');

	await delay(1000);

	expect(res.args.alertOutHandler).toHaveBeenCalled();
};

export const html = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const html = canvas.getByText('Test the HTML');

	expect(html).toBeInTheDocument();

	expect(html).not.toHaveClass('test-class');
};
