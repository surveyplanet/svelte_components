import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '@surveyplanet/utilities';

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');
	const close = canvas.getByRole('button');
	const title = canvas.getByText('Alert Title');
	const subtitle = canvas.getByText('Alert Subtitle');
	// const style = window.getComputedStyle(alert);

	expect(alert).toBeInTheDocument();
	expect(title).toBeInTheDocument();
	expect(close).toBeInTheDocument();
	expect(subtitle).toBeInTheDocument();
	// expect(style.getPropertyValue('background-color')).toBe(
	// 	'rgb(217, 254, 219)'
	// );

	expect(alert).toHaveClass('sp-alert');
	expect(alert).toHaveClass('sp-alert--info');
	expect(alert).toHaveAttribute('role', 'alert');
	expect(close).toHaveClass('sp-alert--header--close-btn');
	expect(title).toHaveClass('sp-alert--header--title');
	expect(subtitle).toHaveClass('sp-alert--header--subtitle');

	expect(res.args.openHandler).toHaveBeenCalled();

	await delay(501);
	expect(res.args.inHandler).toHaveBeenCalled();
};

export const close = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const alert = canvas.getByRole('alert');
	const close = canvas.getByRole('button');
	expect(alert).toBeInTheDocument();
	userEvent.click(close);
	await delay(301);
	expect(alert).not.toBeInTheDocument();
	expect(res.args.closeHandler).toHaveBeenCalled();
	expect(res.args.outHandler).toHaveBeenCalled();
};

export const confirm = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const confirmButton = canvas.getByRole('button', { name: 'Confirm' });
	expect(confirmButton).toBeInTheDocument();
	expect(confirmButton.parentElement).toHaveClass('sp-alert--confirm');
	userEvent.click(confirmButton);
	await delay(301);
	expect(res.args.confirmHandler).toHaveBeenCalled();
};

export const challenge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');
	const submitButton = canvas.getByRole('button', { name: 'Submit' });
	const closeButton = canvas.getByRole('button', { name: 'Close' });
	const textInput = canvas.getByRole('textbox');

	expect(alert).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
	expect(closeButton).toBeInTheDocument();
	expect(textInput).toBeInTheDocument();

	expect(submitButton.parentElement).toHaveClass('sp-alert--confirm');
	expect(closeButton.parentElement).toHaveClass('sp-alert--close');
	userEvent.click(submitButton);
	// expect(alert).toHaveClass('sp-alert--visible');
	expect(alert).toBeInTheDocument();
	userEvent.type(textInput, 'test');
	expect(textInput).toHaveValue('test');
	expect(res.args.challengeHandler).toHaveBeenCalled();
	userEvent.click(submitButton);
	await delay(301);
	// expect(alert).not.toHaveClass('sp-alert--visible');
	expect(alert).not.toBeInTheDocument();
};

export const delayHide = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');

	await delay(1000);

	// expect(alert).not.toHaveClass('sp-alert--visible');
};

// export const delayHideConfirm = async (res: StoryBookPlayArgs) => {
// 	const canvas = within(res.canvasElement);
// 	const alert = canvas.getByRole('alert');
// 	const confirmButton = canvas.getByRole('button', { name: 'Confirm' });

// 	expect(confirmButton).toBeInTheDocument();
// 	// expect(alert).toHaveClass('sp-alert--visible');

// 	await delay(1000);

// 	// expect(alert).toHaveClass('sp-alert--visible');
// };

export const html = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const html = canvas.getByText('Test the HTML');

	expect(html).toBeInTheDocument();

	expect(html).toHaveClass('test-class');
};
