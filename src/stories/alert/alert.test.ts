import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '@surveyplanet/utilities';

const animationTime = 1000 + 1;

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const close = canvas.getByRole('button');

	const alert = canvas.getByRole('alert');
	const title = canvas.getByText('Did you know?');
	const subtitle = canvas.getByText('Informational alert');
	const body = canvas.getByText('There are things you need to know.');
	// const style = window.getComputedStyle(alert);

	expect(alert).toBeInTheDocument();
	expect(title).toBeInTheDocument();
	expect(close).toBeInTheDocument();
	expect(subtitle).toBeInTheDocument();
	expect(body).toBeInTheDocument();
	// expect(style.getPropertyValue('background-color')).toBe(
	// 	'rgb(217, 254, 219)'
	// );

	expect(alert).toHaveClass('sp-alert');
	expect(alert).toHaveClass('sp-alert--info');
	expect(alert).toHaveAttribute('role', 'alert');
	expect(close).toHaveClass('sp-alert--header--close-btn');
	expect(title).toHaveClass('sp-alert--header--title');
	expect(subtitle).toHaveClass('sp-alert--header--subtitle');
	expect(body).toHaveClass('sp-alert--body');
	expect(res.args.openHandler).toHaveBeenCalled();
	await delay(animationTime);
	expect(res.args.inHandler).toHaveBeenCalled();
};

export const close = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const alert = canvas.getByRole('alert');
	const close = canvas.getByRole('button');
	expect(alert).toBeInTheDocument();
	userEvent.click(close);
	await delay(animationTime);
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
	await delay(animationTime);
	expect(res.args.confirmHandler).toHaveBeenCalled();
};

export const challenge = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const alert = canvas.getByRole('alert');
	const submitButton = canvas.getByRole('button', {
		name: 'Delete account',
	}) as HTMLButtonElement;

	const closeButton = canvas.getByRole('button', {
		name: 'Cancel',
	}) as HTMLButtonElement;
	const challengeInput = canvas.getByRole('textbox') as HTMLInputElement;

	expect(alert).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
	expect(closeButton).toBeInTheDocument();
	expect(challengeInput).toBeInTheDocument();

	expect(submitButton.parentElement).toHaveClass('sp-alert--confirm');
	expect(closeButton.parentElement).toHaveClass('sp-alert--close');

	expect(submitButton.disabled).toBeTruthy();
	userEvent.type(challengeInput, 'testing@example.com');
	expect(challengeInput).toHaveValue('testing@example.com');
	await delay(); // next tick
	expect(submitButton.disabled).toBeFalsy();
	userEvent.click(submitButton);
	await delay(animationTime);
	expect(alert).not.toBeInTheDocument();
};

export const delayHide = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const alert = canvas.getByRole('alert');
	expect(alert).toBeInTheDocument();
	expect(alert).not.toHaveClass('sp-alert--confirm');
	await delay(animationTime * 2 + 50);
	expect(alert).not.toBeInTheDocument();
};

export const html = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const h4 = canvas.getByText('Some HTML content');
	expect(h4).toBeInTheDocument();
	const link = canvas.getByTestId('test-link');
	expect(link).toBeInTheDocument();
	const image = canvas.getByTestId('test-img');
	expect(image).toBeInTheDocument();
};
