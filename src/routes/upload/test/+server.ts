import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';

const TEST_IMAGE = {
	Key: 'testing/default',
	Location: 'https://media.surveyplanet.com/testing/default',
};

export const POST = () => {
	return json(TEST_IMAGE);
};

export const GET = () => {
	return json(TEST_IMAGE);
};
