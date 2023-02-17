import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { COLORS } from '../../lib';

type IconElement = HTMLElement & SVGSVGElement;

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const svgTitle = canvas.getByTitle('icon search');
	const icon = svgTitle.parentElement as IconElement;
	const path = document.getElementsByTagName('path')[0];
	expect(path).toBeDefined();

	expect(icon).toBeVisible();
	expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
	expect(icon).toHaveAttribute('width', '24');
	expect(icon).toHaveAttribute('height', '24');
	expect(icon).toHaveAttribute('fill', 'none');
	expect(path).toHaveAttribute('stroke', COLORS.purple_dark);
};

export const light = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const svgTitle = canvas.getByTitle('icon search');
	const icon = svgTitle.parentElement as IconElement;
	const path = document.getElementsByTagName('path')[0];
	expect(path).toBeDefined();
	expect(icon).toBeVisible();
	expect(path).toHaveAttribute('stroke', COLORS.light_purple_light);
};

export const large = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const svgTitle = canvas.getByTitle('icon trash');
	const icon = svgTitle.parentElement as IconElement;
	const path = document.getElementsByTagName('path')[0];
	expect(path).toBeDefined();
	expect(icon).toBeVisible();
	expect(icon).toHaveAttribute('width', '512');
	expect(icon).toHaveAttribute('height', '512');
	expect(path).toHaveAttribute('stroke', COLORS.green_dark);
};

export const small = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const svgTitle = canvas.getByTitle('icon close');
	const icon = svgTitle.parentElement as IconElement;
	const path = document.getElementsByTagName('path')[0];
	expect(path).toBeDefined();
	expect(icon).toBeVisible();
	expect(icon).toHaveAttribute('width', '12');
	expect(icon).toHaveAttribute('height', '12');
	expect(path).toHaveAttribute('stroke', COLORS.pink_dark);
};

export const filled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const svgTitle = canvas.getByTitle('icon ellipses');
	const icon = svgTitle.parentElement as IconElement;
	const path = document.getElementsByTagName('circle')[0];
	expect(path).toBeDefined();
	expect(icon).toBeVisible();
	expect(icon).toHaveAttribute('width', '24');
	expect(icon).toHaveAttribute('height', '24');
	expect(path).toHaveAttribute('fill', COLORS.blue_dark);
};

export const notFound = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const svgTitle = canvas.getByTitle('icon notFound');
	const icon = svgTitle.parentElement as IconElement;
	const path = document.getElementsByTagName('path')[0];
	expect(path).toBeDefined();
	expect(icon).toBeVisible();
	expect(icon).toHaveAttribute('width', '24');
	expect(icon).toHaveAttribute('height', '24');
	expect(path).toHaveAttribute('stroke', 'red');
};
